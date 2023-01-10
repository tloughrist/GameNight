class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.references :sender, foreign_key: { to_table: :users }
      t.references :receiver, foreign_key: { to_table: :users }
      t.references :game_night, foreign_key: { to_table: :game_nights }
      t.string :topic
      t.text :body

      t.timestamps
    end
  end
end
