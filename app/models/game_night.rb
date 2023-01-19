class GameNight < ApplicationRecord
    belongs_to :originator, class_name: :User
    has_many :messages, foreign_key: :game_night_id
    has_many :invitations, foreign_key: :game_night_id
    has_many :invitees, class_name: :User, through: :invitations, foreign_key: :game_night_id
    has_many :attendances, foreign_key: :game_night_id
    has_many :attendees, class_name: :User, through: :attendances, foreign_key: :game_night_id
    has_many :game_night_games
    has_many :games, through: :game_night_games
end
