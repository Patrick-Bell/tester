class Fields < ActiveRecord::Migration[8.0]
  def change
    add_column :orders, :name, :string
    add_column :orders, :email, :string
    add_column :orders, :phone, :string
    add_column :orders, :platform, :string
  end
end
