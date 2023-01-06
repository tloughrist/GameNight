class UserGamesController < ApplicationController

  before_action :authorize

  def create
    user_game = UserGame.create(user_game_params)
    if user_game.valid?
      render json: user_game, status: :created
    else
      render json: { errors: user_game.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    user_game = UserGame.find_by(id: params[:id])
      if user_game
        render json: user_game
      else
        render json: { error: "User/Game not found" }, status: :not_found
      end
  end

  def get_games
    user_games = UserGame.where(owner_id: params[:user_id]).all
    games = user_games.map { |usergame| usergame.game }
    render json: games
  end

  def destroy
      user_game = UserGame.find_by(id: params[:id])
      user_game.delete
      head :no_content
  end

  private

  def user_games_params
      params.permit(:owner_id, :game_id)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end
