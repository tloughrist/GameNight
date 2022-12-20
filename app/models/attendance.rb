class Attendance < ApplicationRecord
    belongs_to :game_night
    belongs_to :attendee, class_name: :User
end
