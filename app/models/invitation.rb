class Invitation < ApplicationRecord
    belongs_to :game_night, class_name: :GameNight
    belongs_to :sender, class_name: :User
    belongs_to :receiver, class_name: :User

end
