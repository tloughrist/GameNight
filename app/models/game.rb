class Game < ApplicationRecord
    has_many :user_games, foreign_key: 'game_id'
    has_many :owners, class_name: 'User', through: :user_games
    belongs_to :originator, class_name: :User

    def package_game(user_id)
        user = User.find(user_id)
        user_games = user.user_games
        owned_game = user_games.find_by(game_id: self.id)
        originated_game = user.originator_games.find_by(id: self.id)
        flag_owned = owned_game ? true : false
        flag_orig = originated_game ? true : false
        flagged_game = {game: self, originated: flag_orig, owned: flag_owned}
    end
    
end
