class GameNightsController < ApplicationController

  before_action :authorize

  def create
      gameNight = GameNight.create(game_night_params)
      if gameNight.valid?
        render json: gameNight, status: :created
      else
        render json: { errors: gameNight.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def show
      gameNight = GameNight.find_by(id: params[:id])
      if gameNight
        render json: GameNight
      else
        render json: { error: "Game night not found" }, status: :not_found
      end
  end

  def update
      gameNight = GameNight.find_by(id: params[:id])
      gameNight.update(game_night_params)
      if gameNight.valid?
        render json: gameNight, status: :accepted
      else
        render json: { errors: gameNight.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def destroy
      gameNight = GameNight.find_by(id: params[:id])
      gameNight.delete
      head :no_content
  end

  private

  def game_night_params
      params.permit(:date, :time, :location, :owner_id)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end
