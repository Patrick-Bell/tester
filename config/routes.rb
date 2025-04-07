Rails.application.routes.draw do

  root 'home#index'  # or any other controller you want to load first
  get 'home/index'


  scope '/api' do
    
    # Auth Routes
    post 'login', to: 'sessions#create'
    post 'signup', to: 'registrations#create'
    get 'auth_status', to: 'sessions#auth_status'
    get 'current-user', to: 'application#current_user', as: 'current_user'

    get 'my-orders', to: 'orders#user_orders', as: 'user_orders'


    resources :orders
    resources :products
    resources :reviews
    resources :users
    resources :events
    resources :images
    resources :promotions


    # Stripe Checkout
    post 'create-checkout-session', to: 'checkout#create_checkout_session', as: 'create_checkout_session'
    post 'webhooks', to: 'checkout#stripe_webhook', as: 'stripe_webhook'


  end

  # Catch-all for React Frontend Routing
  get '*path', to: 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }


  
end
