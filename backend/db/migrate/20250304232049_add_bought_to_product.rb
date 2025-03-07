class AddBoughtToProduct < ActiveRecord::Migration[8.0]
  def change
    add_column :products, :bought, :float
  end
end
