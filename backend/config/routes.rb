Rails.application.routes.draw do

  get "home/index"


  scope :api do
  resources :orders
  resources :products
  
  post 'create-checkout-session', to: 'checkout#create_checkout_session', as: 'create_checkout_session'
  post 'webhook', to: 'checkout#stripe_webhook', as: 'stripe_webhook'

  end


  get '*path', to: 'home#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  
end
