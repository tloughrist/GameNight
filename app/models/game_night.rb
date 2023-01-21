class GameNight < ApplicationRecord
    belongs_to :originator, class_name: :User
    has_many :invitations, foreign_key: :game_night_id, dependent: :destroy
    has_many :invitees, class_name: "User", through: :invitations, foreign_key: :game_night_id, source: :receiver
    has_many :attendances, foreign_key: :game_night_id, dependent: :destroy
    has_many :attendees, class_name: "User", through: :attendances, foreign_key: :game_night_id
end