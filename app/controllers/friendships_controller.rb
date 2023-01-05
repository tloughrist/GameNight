class FriendshipsController < ApplicationController

  before_action :authorize

  def create
    friendship = Friendship.create(friendship_params)
    if friendship.valid?
      render json: friendship, status: :created
    else
      render json: { errors: friendship.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    friendship = Friendship.find_by(id: params[:id])
      if friendship
        render json: friendship
      else
        render json: { error: "Friendship not found" }, status: :not_found
      end
  end

  def destroy
      friendship = Friendship.find_by(user_id: params[:user_id], friend_id: params[:friend_id])
      friendship.delete
      head :no_content
  end

  private

  def friendship_params
      params.permit(:user_id, :friend_id)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end