Rails.application.routes.draw do
  resources :reviews

  get "home/index"


  scope :api do
  resources :orders
  resources :products
  resources :reviews
  
  post 'create-checkout-session', to: 'checkout#create_checkout_session', as: 'create_checkout_session'
  post 'webhooks', to: 'checkout#stripe_webhook', as: 'stripe_webhook'

  end


  get '*path', to: 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }


  
end
