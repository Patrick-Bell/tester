class User < ApplicationRecord
  has_many :orders
  before_create :set_default_role

  def set_default_role
    self.role ||= 'user'
  end

  # Devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  # Method to find or create a user from the OAuth provider

  def self.from_omniauth(auth)
    user = User.find_or_create_by(email: auth.info.email) do |u|
      u.password = SecureRandom.hex(20)
      u.name = 'Tester'
    end
    user
  end

end
