class Game < ApplicationRecord
    has_many :user_games, foreign_key: 'game_id'
    has_many :owners, class_name: 'User', through: :user_games
    belongs_to :originator, class_name: :User
end
