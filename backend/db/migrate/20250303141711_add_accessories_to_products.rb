class AddAccessoriesToProducts < ActiveRecord::Migration[8.0]
  def change
    add_column :products, :accessories, :string
  end
end
