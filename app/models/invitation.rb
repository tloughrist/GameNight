class Invitation < ApplicationRecord
    belongs_to :game_night
    belongs_to :sender, class_name: :User
    belongs_to :receiver, class_name: :User
end
