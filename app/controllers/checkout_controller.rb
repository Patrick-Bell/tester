class CheckoutController < ApplicationController
    require 'stripe'

    Stripe.api_key = ENV['STRIPE_API_KEY']
    
    def create_checkout_session
      cart = params[:cart] || []
      Rails.logger.info("Received cart: #{cart.inspect}")
  
      line_items = params[:cart].map do |item|
        images = item["images"].reject { |img| img["url"].blank? }
    
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: item["name"],
              images: images.map { |img| img["url"] }
            },
            unit_amount: (item['price'] * 100).to_i,  # Convert to cents
          },
          quantity: item["quantity"]
        }
      end
  
      session = Stripe::Checkout::Session.create(
        payment_method_types: ['card'],
        line_items: line_items, # ✅ Added line_items here
        mode: 'payment',
        shipping_address_collection: {
          allowed_countries: ['GB'] # Add countries where you ship
        },
        shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 500, # $5.00
                  currency: "gbp"
                },
                display_name: "2-3 days",
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 5 },
                  maximum: { unit: "business_day", value: 7 }
                }
              }
            },
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 1500, # $15.00
                  currency: "gbp"
                },
                display_name: "Express Shipping (1-2 days)",
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 1 },
                  maximum: { unit: "business_day", value: 2 }
                }
              }
            }
          ],
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
        # metadata: { user_id: current_user ? current_user.id : 'guest' }
    
      )
  
      render json: { url: session.url } # ✅ Send URL to frontend
    end

    def stripe_webhook
      payload = request.body.read
      sig_header = request.env['HTTP_STRIPE_SIGNATURE']
      signing_secret = ENV['STRIPE_SIGNING_SECRET']
    
      begin
        event = Stripe::Webhook.construct_event(payload, sig_header, signing_secret)
      rescue JSON::ParserError
        Rails.logger.error("❌ Invalid JSON in webhook")
        return head :bad_request
      rescue Stripe::SignatureVerificationError
        Rails.logger.error("❌ Invalid Stripe Signature")
        return head :bad_request
      end
    
      Rails.logger.info("🔔 Received Stripe event: #{event.type}")
    
      case event.type
      when 'invoice.payment_succeeded'
        invoice = event.data.object
        order_id = invoice.metadata.order_id
        Rails.logger.info("🔔 Invoice ##{invoice.id} successfully paid.")
        
        # Update order status in your database
        order = Order.find_by(id: order_id)
        if order
          order.update!(status: 'paid')
          Rails.logger.info("✅ Order ##{order.id} marked as paid.")
        else
          Rails.logger.warn("⚠️ Order ##{order_id} not found.")
        end
    
      else
        Rails.logger.info("Unhandled event type: #{event.type}")
      end
    
      head :ok
    end


    private

    def update_stock(order)
      updated = false
      
      order.line_items.each do |item|
        product = Product.find_by(id: item.product_id)
        
        if product
          product.update(stock: product.stock - item.quantity)
          updated = true 
        else
          Rails.logger.warn("⚠️ Product with ID #{item.product_id} not found!")
        end
      end
    
      if updated
        render json: { message: 'Stock updated successfully' }, status: :ok
      else
        render json: { message: 'No products found or failed to update stock' }, status: :unprocessable_entity
      end
    end
    



    

  end
  