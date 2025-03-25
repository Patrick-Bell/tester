class User < ApplicationRecord
  has_many :orders
  before_create :set_default_role
  has_secure_password


  def set_default_role
    self.role ||= 'user'
  end

 
end
