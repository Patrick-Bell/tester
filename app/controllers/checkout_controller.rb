class CheckoutController < ApplicationController
    require 'stripe'

    Stripe.api_key = ENV['STRIPE_API_KEY']
    
    def create_checkout_session
      cart = params[:cart] || []
      Rails.logger.info("Received cart: #{cart.inspect}")
  
      line_items = cart.map do |item|
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: item['name'],
              images: [item['image']] # Stripe expects an array
            },
            unit_amount: (item['price'].to_f * 100).to_i # Convert price to cents
          },
          quantity: item['quantity'].to_i
        }
      end
  
      session = Stripe::Checkout::Session.create(
        payment_method_types: ['card'],
        line_items: line_items, # ✅ Added line_items here
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
        appearance: {
        theme: 'light', # Or 'dark'
        brand_color: '#0070f3', # Your brand color
        logo: 'data:image/jpeg;base64,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', # Logo image URL
      },
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
    

  end
  