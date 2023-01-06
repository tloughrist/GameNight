class UserGame < ApplicationRecord
    belongs_to :game
    belongs_to :owner, class_name: :User
end
