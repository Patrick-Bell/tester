class SessionsController < ApplicationController

skip_before_action :verify_authenticity_token, only: [:google_oauth2]


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
    
          render json: { message: 'Login successful', user: user, exp: 1.hour.from_now, token: token }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end


      def google_oauth2
        # Extract the credential (JWT token from Google)
        credential = params[:credential]
    
        if credential.blank?
          return render json: { error: 'No credential provided' }, status: :unauthorized
        end
    
        # Decode Google's JWT token
        google_response = decode_google_token(credential)
    
        if google_response.nil?
          return render json: { error: 'Invalid Google token' }, status: :unauthorized
        end
    
        # Find or create the user
        user = User.find_or_create_by(email: google_response['email']) do |u|
          u.password = SecureRandom.hex(20) # Set a random password for Google users
        end
    
        # Generate our own JWT token for authentication
        token = generate_jwt_token(user)
    
        render json: { token: token, user: user }
      end

      def generate_jwt_token(user)
        JWT.encode({ user_id: user.id, email: user.email, exp: 1.hour.from_now.to_i }, JWT_SECRET_KEY, 'HS256')
      end



     
end
