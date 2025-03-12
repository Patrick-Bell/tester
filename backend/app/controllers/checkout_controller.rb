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
        cancel_url: 'http://localhost:5173/cancel'
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
      when 'payment_intent.succeeded'
        payment_intent = event.data.object
        order_id = payment_intent.metadata['order_id']

    
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
  