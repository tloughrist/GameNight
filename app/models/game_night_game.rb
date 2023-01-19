class GameNightGame < ApplicationRecord
  belongs_to :attendee, class_name: :User
  belongs_to :game
  belongs_to :game_night

end
