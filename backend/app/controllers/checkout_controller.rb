class CheckoutController < ApplicationController
    require 'stripe'
  
    STRIPE_API_KEY = ENV['STRIPE_API_KEY']
  
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
      signing_secret = ENV['STRIPE_SIGNING_SECRET'] # ✅ Fix
  
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
      when 'checkout.session.completed'
        session = event.data.object
        Order.create!(paid: true)
        Rails.logger.info("✅ Order successfully created")
      else
        Rails.logger.info("Unhandled event type: #{event.type}")
      end
  
      head :ok
    end


  end
  