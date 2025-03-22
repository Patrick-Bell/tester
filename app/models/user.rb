class User < ApplicationRecord

  has_many :orders
  before_create :set_default_role

  def set_default_role
    self.role == 'user'
  end
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
