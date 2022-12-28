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

  def destroy
      user_game = UserGame.find_by(id: params[:id])
      user_game.delete
      head :no_content
  end

  private

  def user_games_params
      params.permit(:owner_id, :game_id)
  end

end
