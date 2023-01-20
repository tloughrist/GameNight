class GameNight < ApplicationRecord
    belongs_to :originator, class_name: :User
    has_many :messages, foreign_key: :game_night_id
    has_many :invitations, foreign_key: :game_night_id
    has_many :invitees, class_name: "User", through: :invitations, foreign_key: :game_night_id, source: :receiver
    has_many :attendances, foreign_key: :game_night_id
    has_many :attendees, class_name: "User", through: :attendances, foreign_key: :game_night_id
end
