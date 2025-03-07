class CreateEvents < ActiveRecord::Migration[8.0]
  def change
    create_table :events do |t|
      t.string :name
      t.date :deadline
      t.string :description

      t.timestamps
    end
  end
end
