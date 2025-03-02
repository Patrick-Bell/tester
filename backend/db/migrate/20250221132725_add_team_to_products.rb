class AddTeamToProducts < ActiveRecord::Migration[8.0]
  def change
    add_column :products, :team, :string
  end
end
