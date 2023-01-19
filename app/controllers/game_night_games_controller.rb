class GameNightsController < ApplicationController

  before_action :authorize

  def create
    game_night_game = GameNightGame.create(game_night_params)
    if game_night_game.valid?
      user = User.find(params[:attendee_id])
      attendances = user.attendances
      packages = attendances.map {|attendance| {night: attendance.game_night, originator: attendance.game_night.originator}}
      render json: packages, status: :ok
    else
      render json: { errors: game_night_game.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    game_night_game = GameNightGame.find_by(id: params[:id])
    game_night_game.delete
    head :no_content
  end

  private

  def game_night_params
    params.permit(:attendee_id, :game_id, :game_night_id)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end
