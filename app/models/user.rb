class User < ApplicationRecord
    has_many :attendances
    has_many :friend_requests
    has_many :friendships, ->(user) { where("user_id = ? OR friend_id = ?", user.id, user.id) }
    has_many :friends, through: :friendships
    has_many :game_nights
    has_many :invitations
    has_many :messages
    has_many :user_games
    has_many :games, through: :user_games
end
