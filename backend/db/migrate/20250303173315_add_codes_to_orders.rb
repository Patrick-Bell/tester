class AddCodesToOrders < ActiveRecord::Migration[8.0]
  def change
    add_column :orders, :order_id, :string
    add_column :orders, :tracking_id, :string
  end
end
