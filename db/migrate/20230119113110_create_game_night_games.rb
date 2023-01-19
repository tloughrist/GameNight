class CreateGameNightGames < ActiveRecord::Migration[6.1]
  def change
    create_table :game_night_games do |t|
      t.references :attendee, foreign_key: { to_table: :users }
      t.references :game, foreign_key: { to_table: :games }
      t.references :game_night, foreign_key: { to_table: :game_nights }

      t.timestamps
    end
  end
end
