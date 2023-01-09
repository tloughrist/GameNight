class AddGameNightIdToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :game_night_id, :integer
  end
end
