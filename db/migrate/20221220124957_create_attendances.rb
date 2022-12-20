class CreateAttendances < ActiveRecord::Migration[6.1]
  def change
    create_table :attendances do |t|
      t.integer :game_night_id
      t.integer :attendee_id
      t.string :certainty

      t.timestamps
    end
  end
end
