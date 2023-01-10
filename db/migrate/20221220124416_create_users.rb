class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username
      t.string :password_digest
      t.string :blurb
      t.date :dob
      t.string :pronouns
      t.string :email

      t.timestamps
    end
  end
end
