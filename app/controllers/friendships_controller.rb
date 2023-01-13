class FriendshipsController < ApplicationController

  before_action :authorize

  def create
    friendship = Friendship.create(friendship_params)
    if friendship.valid?
      friend = User.find(friendship.friender_id)
      render json: friend, status: :created
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
    user = User.find_by(id: params[:user_id])
    friendee_friendship = user.friendee_friendships.find_by(friender_id: params[:friend_id])
    friender_friendship = user.friender_friendships.find_by(friendee_id: params[:friend_id])
    if friendee_friendship.nil?
      friender_friendship.delete
    else
      friendee_friendship.delete
    end
    friends = user.friends
    render json: friends
  end

  private

  def friendship_params
      params.permit(:friender_id, :friendee_id)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end