class User < ApplicationRecord

    has_secure_password

    has_many :attendances
    has_many :friend_requests
    has_many :friendships, ->(user) { where("user_id = ? OR friend_id = ?", user.id, user.id) }
    has_many :friends, through: :friendships
    has_many :game_nights
    has_many :invitations
    has_many :messages
    has_many :user_games
    has_many :games, through: :user_games

    def User.digest(string)
        cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
    end

end