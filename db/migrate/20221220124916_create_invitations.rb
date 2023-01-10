class CreateInvitations < ActiveRecord::Migration[6.1]
  def change
    create_table :invitations do |t|
      t.references :game_night, foreign_key: { to_table: :game_nights }
      t.references :receiver, foreign_key: { to_table: :users }
      t.references :sender, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
