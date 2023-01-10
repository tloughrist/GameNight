class CreateAttendances < ActiveRecord::Migration[6.1]
  def change
    create_table :attendances do |t|
      t.references :game_night, foreign_key: { to_table: :game_nights }
      t.references :attendee, foreign_key: { to_table: :users }
      t.string :certainty

      t.timestamps
    end
  end
end
