class GamesController < ApplicationController

  before_action :authorize

  def create
      game = Game.create(game_params)
      if game.valid?
        packaged_game = {game: game, originated: true, owned: true}
        render json: packaged_game, status: :created
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
    packaged_games = games.map {|game| game.package_game(params[:user_id])}
    if games.size > 0
      render json: packaged_games
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
        package = game.package_game(game.originator_id)
        render json: package, status: :accepted
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
      params.permit(:originator_id, :title, :no_players, :duration_minutes, :complexity)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end