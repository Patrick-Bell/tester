Rails.application.routes.draw do

  root "home#index"  # Set the root path to home#index
  
  get "home/index"

  scope :api do
    # Devise authentication routes (No need to define manually)
    devise_for :users, path: '', path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'sessions'
    }

    # Check auth status (Custom route)
    get 'auth_status', to: 'sessions#auth_status'

    # API Resources
    resources :orders
    resources :products
    resources :reviews

    # Stripe Checkout
    post 'create-checkout-session', to: 'checkout#create_checkout_session', as: 'create_checkout_session'
    post 'webhooks', to: 'checkout#stripe_webhook', as: 'stripe_webhook'
  end

  # Catch-all for React Frontend Routing
  get '*path', to: 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
