class CreateFriendships < ActiveRecord::Migration[6.1]
  def change
    create_table :friendships do |t|
      t.references :friender, foreign_key: { to_table: :users }
      t.references :friendee, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
