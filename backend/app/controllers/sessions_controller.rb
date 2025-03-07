class SessionsController < ApplicationController

    
    include ActionController::Cookies
    JWT_SECRET_KEY = ENV['JWT_SECRET_KEY']


    def create
        user = User.find_by(email: params[:user][:email])
    
        if user&.valid_password?(params[:user][:password])
          token = JWT.encode({ user_id: user.id, email: user.email, exp: 1.hour.from_now.to_i }, JWT_SECRET_KEY, 'HS256')
    
          Rails.logger.debug "Generated Token: #{token}"
    
          cookies[:token] = {
            value: token,
            httponly: true,
            secure: Rails.env.production?,
            same_site: :lax,  # Adjust if needed
            expires: 1.hour.from_now,
          }
    
          render json: { message: 'Login successful', user: user, exp: 1.hour.from_now }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end


end
