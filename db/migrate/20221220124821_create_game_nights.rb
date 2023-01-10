class CreateGameNights < ActiveRecord::Migration[6.1]
  def change
    create_table :game_nights do |t|
      t.string :title
      t.date :date
      t.time :time
      t.references :originator, foreign_key: { to_table: :users }
      t.string :location

      t.timestamps
    end
  end
end
