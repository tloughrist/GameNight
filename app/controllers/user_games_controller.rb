class UserGamesController < ApplicationController

  before_action :authorize

  def create
    user_game = UserGame.create(user_games_params)
    if user_game.valid?
      package = user_game.game.package_game(params[:owner_id])
      render json: package, status: :created
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
    user = User.find(params[:user_id])
    user_game = user.user_games.find_by(game_id: params[:game_id])
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
