class User < ApplicationRecord

    has_secure_password

    has_many :attendances, foreign_key: 'attendee_id', dependent: :destroy 
    has_many :sender_friend_requests, class_name: 'FriendRequest', foreign_key: 'sender_id', dependent: :destroy
    has_many :receiver_friend_requests, class_name: 'FriendRequest',foreign_key: 'receiver_id', dependent: :destroy
    has_many :friender_friendships, class_name: 'Friendship', foreign_key: 'friender_id', dependent: :destroy
    has_many :friendee_friendships, class_name: 'Friendship', foreign_key:  'friendee_id', dependent: :destroy
    has_many :friendees, class_name: 'User', through: :friender_friendships
    has_many :frienders, class_name: 'User', through: :friendee_friendships
    has_many :originator_game_nights, class_name: 'GameNight', foreign_key: 'originator_id', dependent: :destroy
    has_many :attendee_game_nights, class_name: 'GameNight', through: :attendances, foreign_key: 'attendee_id', source: :game_night
    has_many :sender_invitations, class_name: 'Invitation', foreign_key: 'sender_id', dependent: :destroy
    has_many :receiver_invitations, class_name: 'Invitation', foreign_key: 'receiver_id', dependent: :destroy
    has_many :invitee_game_nights, class_name: 'GameNight', through: :receiver_invitations, foreign_key: 'receiver_id', source: :game_night

    validates :username, uniqueness: true
    validates :username, length: { minimum: 5 }, allow_blank: true
    validates :dob, :email, presence: true
    validates :password, length: { minimum: 8 }, allow_blank: true

    def User.digest(string)
        cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
    end

    def friends()
        friendees = self.friendees
        frienders = self.frienders
        friends = friendees + frienders
    end

end