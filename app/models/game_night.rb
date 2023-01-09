class GameNight < ApplicationRecord
    belongs_to :owner, class_name: :User
    has_many :messages
    has_many :invitations
end
