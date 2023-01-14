class GamesController < ApplicationController

  before_action :authorize

  def create
      game = Game.create(game_params)
      if game.valid?
        render json: game, status: :created
      else
        render json: { errors: game.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def index
      games = Game.all
      render json: games, status: :accepted
  end

  def find
    #note the use of lower() to downcase the title
    games = Game.where('lower(title) LIKE ?', '%' + params[:query].downcase + '%').all
    user = User.find(params[:user_id])
    user_games = user.user_games
    owner_games = user_games.map {|user_game| user_game.game}
    originator_games = user.originator_games
    matched_originator_games = []
    unmatched_originator_games = []
    matched_owner_games = []
    unmatched_owner_games = []
    if originator_games.size > 0
      matched_originator_games = games & originator_games
      unmatched_originator_games = games - originator_games
    end
    if owner_games.size > 0
      matched_owner_games = games & owner_games
      unmatched_owner_games = games - owner_games
    end
    orig_own_games = matched_originator_games & matched_owner_games
    orig_games = matched_originator_games & unmatched_owner_games
    own_games = matched_owner_games & unmatched_originator_games
    clean_games = unmatched_originator_games & unmatched_owner_games
    flagged_orig_own_games = orig_own_games.map {|game| {game: game, originator: true, owner: true}}
    flagged_orig_games = orig_games.map {|game| {game: game, originator: true, owner: false}}
    flagged_own_games = own_games.map {|game| {game: game, originator: false, owner: true}}
    flagged_clean_games = orig_own_games.map {|game| {game: game, originator: false, owner: false}}
    flaggedGames = flagged_clean_games.union(flagged_orig_own_games).union(flagged_orig_games).union(flagged_own_games)
    if games.size > 0
      render json: flaggedGames
    else
      render json: { error: "No games match search criteria" }, status: :not_found
    end
  end

  def show
      game = Game.find_by(id: params[:id])
      if game
        render json: game
      else
        render json: { error: "Game not found" }, status: :not_found
      end
  end

  def update
      game = Game.find_by(id: params[:id])
      game.update(game_params)
      if game.valid?
        render json: game, status: :accepted
      else
        render json: { errors: game.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def destroy
      game = Game.find_by(id: params[:id])
      game.delete
      head :no_content
  end

  private

  def game_params
      params.permit(:title, :no_players, :duration_minutes, :complexity)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end