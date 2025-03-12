class ChangeShippingFeeDefaultType < ActiveRecord::Migration[8.0]
  def change
    change_column_default :orders, :shipping_fee, from: "0.0", to: 0.0
  end
end
