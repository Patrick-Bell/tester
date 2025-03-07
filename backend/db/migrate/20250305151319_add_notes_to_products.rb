class AddNotesToProducts < ActiveRecord::Migration[8.0]
  def change
    add_column :products, :notes, :string
  end
end
