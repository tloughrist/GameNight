# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_01_19_113110) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attendances", force: :cascade do |t|
    t.bigint "game_night_id"
    t.bigint "attendee_id"
    t.string "certainty"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["attendee_id"], name: "index_attendances_on_attendee_id"
    t.index ["game_night_id"], name: "index_attendances_on_game_night_id"
  end

  create_table "friend_requests", force: :cascade do |t|
    t.bigint "sender_id"
    t.bigint "receiver_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["receiver_id"], name: "index_friend_requests_on_receiver_id"
    t.index ["sender_id"], name: "index_friend_requests_on_sender_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.bigint "friender_id"
    t.bigint "friendee_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["friendee_id"], name: "index_friendships_on_friendee_id"
    t.index ["friender_id"], name: "index_friendships_on_friender_id"
  end

  create_table "game_night_games", force: :cascade do |t|
    t.bigint "attendee_id"
    t.bigint "game_id"
    t.bigint "game_night_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["attendee_id"], name: "index_game_night_games_on_attendee_id"
    t.index ["game_id"], name: "index_game_night_games_on_game_id"
    t.index ["game_night_id"], name: "index_game_night_games_on_game_night_id"
  end

  create_table "game_nights", force: :cascade do |t|
    t.string "title"
    t.date "date"
    t.string "time"
    t.bigint "originator_id"
    t.string "location"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["originator_id"], name: "index_game_nights_on_originator_id"
  end

  create_table "games", force: :cascade do |t|
    t.bigint "originator_id"
    t.string "title"
    t.string "no_players"
    t.integer "duration_minutes"
    t.float "complexity"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["originator_id"], name: "index_games_on_originator_id"
  end

  create_table "invitations", force: :cascade do |t|
    t.bigint "game_night_id"
    t.bigint "receiver_id"
    t.bigint "sender_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_night_id"], name: "index_invitations_on_game_night_id"
    t.index ["receiver_id"], name: "index_invitations_on_receiver_id"
    t.index ["sender_id"], name: "index_invitations_on_sender_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "sender_id"
    t.bigint "receiver_id"
    t.bigint "game_night_id"
    t.string "topic"
    t.text "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_night_id"], name: "index_messages_on_game_night_id"
    t.index ["receiver_id"], name: "index_messages_on_receiver_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "user_games", force: :cascade do |t|
    t.bigint "owner_id"
    t.bigint "game_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_user_games_on_game_id"
    t.index ["owner_id"], name: "index_user_games_on_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password_digest"
    t.string "blurb"
    t.date "dob"
    t.string "pronouns"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "attendances", "game_nights"
  add_foreign_key "attendances", "users", column: "attendee_id"
  add_foreign_key "friend_requests", "users", column: "receiver_id"
  add_foreign_key "friend_requests", "users", column: "sender_id"
  add_foreign_key "friendships", "users", column: "friendee_id"
  add_foreign_key "friendships", "users", column: "friender_id"
  add_foreign_key "game_night_games", "game_nights"
  add_foreign_key "game_night_games", "games"
  add_foreign_key "game_night_games", "users", column: "attendee_id"
  add_foreign_key "game_nights", "users", column: "originator_id"
  add_foreign_key "games", "users", column: "originator_id"
  add_foreign_key "invitations", "game_nights"
  add_foreign_key "invitations", "users", column: "receiver_id"
  add_foreign_key "invitations", "users", column: "sender_id"
  add_foreign_key "messages", "game_nights"
  add_foreign_key "messages", "users", column: "receiver_id"
  add_foreign_key "messages", "users", column: "sender_id"
  add_foreign_key "user_games", "games"
  add_foreign_key "user_games", "users", column: "owner_id"
end
