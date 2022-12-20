class CreateInvitations < ActiveRecord::Migration[6.1]
  def change
    create_table :invitations do |t|
      t.integer :game_night_id
      t.integer :receiver_id
      t.integer :sender_id

      t.timestamps
    end
  end
end
