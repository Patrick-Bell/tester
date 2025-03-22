class Order < ApplicationRecord
  before_validation :generate_tracking_id, on: :create
  before_validation :generate_unique_order_id, on: :create

  before_create :expected_delivery_date

  belongs_to :user, optional: true

  validates :tracking_id, uniqueness: true
  validates :order_id, uniqueness: true

  belongs_to :user

  private

  def generate_tracking_id
    self.tracking_id ||= generate_unique_hex(:tracking_id)
  end

 

  def generate_unique_order_id
    self.order_id ||= generate_unique_hex(:order_id)
  end

  def expected_delivery_date
    self.delivery_date ||= Time.zone.now + 3.days
  end


  def generate_unique_hex(attribute)
    loop do
      token = SecureRandom.hex(20)
      break token unless Order.exists?(attribute => token)
    end
  end
end
