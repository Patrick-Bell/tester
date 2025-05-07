Rails.application.routes.draw do

  root 'home#index'  

  scope '/api' do
    
    # Auth Routes
    post 'login', to: 'sessions#create'
    post 'signup', to: 'registrations#create'
    get 'auth_status', to: 'sessions#auth_status'
    get 'current-user', to: 'application#current_user', as: 'current_user'
    delete 'logout', to: 'sessions#destroy'
    put 'update-user', to: 'users#update', as: 'update_user'

    get 'my-orders', to: 'orders#user_orders', as: 'user_orders'
    get 'my-reviews', to: 'reviews#user_reviews', as: 'user_reviews'
    get 'track-order/:tracking_id', to: 'orders#track_order', as: 'track_order'

    get 'my-wishlist', to: 'product_wishlists#my_wishlist', as: 'my_wishlist'
    post 'order-refund/:id', to: 'orders#order_refund', as: 'order_refund'

    post 'forgot-password', to: 'passwords#forgot_password', as: 'forgot_password'
    put 'change-password', to: 'passwords#change_password', as: 'change_password'
    post 'validate-reset-token', to: 'passwords#validate_reset_token', as: 'validate_reset_token'
    put 'reset-password', to: 'passwords#reset_password', as: 'reset_password'


    resources :orders
    resources :products
    resources :reviews
    resources :users
    resources :events
    resources :images
    resources :line_items
    resources :promotions
    resources :product_wishlists


    # Stripe Checkout
    post 'create-checkout-session', to: 'checkout#create_checkout_session', as: 'create_checkout_session'
    post 'webhooks', to: 'checkout#stripe_webhook', as: 'stripe_webhook'


  end

  # Catch-all for React Frontend Routing
  get '*path', to: 'home#index', constraints: ->(req) { req.format.html? && !req.path.starts_with?('/api') }


  
end
