class Game < ApplicationRecord
    has_many :user_games, foreign_key: 'game_id'
    has_many :owners, class_name: 'User', through: :user_games
    belongs_to :originator, class_name: :User

    def package_game(user_id, game_id) {
        user = User.find(user_id)
        user_games = user.user_games
        owned_game = user_games.find_by(game_id: game_id)
        originated_game = user.originator_games.find(game_id)
        game = Game.find(game_id)
        flagged_game = {game: game, originated: originated_game?, owned: owned_game?}
    }
end
