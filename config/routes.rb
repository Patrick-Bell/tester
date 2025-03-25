Rails.application.routes.draw do

  root 'home#index'  # or any other controller you want to load first


  # API Routes
  scope '/api' do
    # Devise authentication routes (No need to define manually)
    devise_for :users, path: '', path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'sessions',
      registrations: 'registrations'
    }

    # Check auth status (Custom route)
    get 'auth_status', to: 'sessions#auth_status'
    get 'current-user', to: 'application#current_user', as: 'current_user'

    get 'my-orders', to: 'orders#user_orders', as: 'user_orders'

    get 'auth/google_oauth2', to: 'sessions#google_oauth2'

    # API Resources
    resources :orders
    resources :products
    resources :reviews
    resources :users
    resources :events

    # Stripe Checkout
    post 'create-checkout-session', to: 'checkout#create_checkout_session', as: 'create_checkout_session'
    post 'webhooks', to: 'checkout#stripe_webhook', as: 'stripe_webhook'
  end

  # Catch-all for React Frontend Routing

  get '*path', to: 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }


  
end
