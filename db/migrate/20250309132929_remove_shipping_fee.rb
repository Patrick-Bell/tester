class RemoveShippingFee < ActiveRecord::Migration[8.0]
  def change
    remove_column :orders, :shipping_fee
  end
end
