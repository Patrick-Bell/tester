class User < ApplicationRecord
  has_many :orders
  before_create :set_default_role

  def set_default_role
    self.role ||= 'user'
  end

  # Devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Method to find or create a user from the OAuth provider


end
