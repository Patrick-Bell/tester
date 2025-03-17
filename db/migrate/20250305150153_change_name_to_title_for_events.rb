class ChangeNameToTitleForEvents < ActiveRecord::Migration[8.0]
  def change
    rename_column :events, :name, :title
  end
end
