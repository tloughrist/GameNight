class AddNameToGameNight < ActiveRecord::Migration[6.1]
  def change
    add_column :game_nights, :name, :string
  end
end
