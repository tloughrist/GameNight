class CreateUserGames < ActiveRecord::Migration[6.1]
  def change
    create_table :user_games do |t|
      t.references :owner, foreign_key: { to_table: :users }
      t.references :game, foreign_key: { to_table: :games }

      t.timestamps
    end
  end
end
