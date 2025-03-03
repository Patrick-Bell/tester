class Order < ApplicationRecord
    before_create :generate_tracking_id
    before_create :generate_unique_order_id
  
    private
  
    def generate_tracking_id
      self.tracking_id = SecureRandom.hex(20)
    end
  
    def generate_unique_order_id
      self.order_id = SecureRandom.hex(20)
    end

    
  end
  