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

end