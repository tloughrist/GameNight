class CreateGameNights < ActiveRecord::Migration[6.1]
  def change
    create_table :game_nights do |t|
      t.date :date
      t.time :time
      t.integer :owner_id
      t.string :location

      t.timestamps
    end
  end
end
