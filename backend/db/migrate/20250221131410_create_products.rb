class CreateProducts < ActiveRecord::Migration[8.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :image
      t.float :price
      t.integer :stock

      t.timestamps
    end
  end
end
