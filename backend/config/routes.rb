Rails.application.routes.draw do
  resources :orders
  resources :products
  

  post 'create-checkout-session', to: 'checkout#create_checkout_session', as: 'create_checkout_session'
  post 'webhook', to: 'checkout#stripe_webhook', as: 'stripe_webhook'

  
end
