class AddReferenceToOrders < ActiveRecord::Migration[8.0]
  def change
    add_reference :orders, :user, foreign_key: true, null: true # Allow NULL initially
  end
end
