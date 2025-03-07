class RegistrationsController < Devise::RegistrationsController
  
    def create
      user = User.new(sign_up_params)
      if user.save
        render json: { message: 'User registered successfully', user: user }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def sign_up_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
  end
  