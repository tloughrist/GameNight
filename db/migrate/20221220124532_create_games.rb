class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :title
      t.string :no_players
      t.integer :duration_minutes
      t.integer :complexity

      t.timestamps
    end
  end
end
