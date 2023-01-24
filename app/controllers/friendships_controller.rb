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
    friend = User.find_by(id: params[:friend_id])
    friendee_friendship = user.friendee_friendships.where(friender_id: friend.id)
    friender_friendship = user.friender_friendships.where(friendee_id: friend.id)
    if friendee_friendship.size > 0
      friendee_invitations = friendee_friendship.first().get_invitations
      friendee_attendances = friendee_friendship.first().get_attendances
      friendee_friendship.each {|el| el.destroy}
      if friendee_invitations.size > 0
        friendee_invitations.first.destroy_all
      end
      if friendee_attendances.size > 0
        friendee_attendances.first.destroy_all
      end
    elsif friender_friendship.size > 0
      friender_invitations = friender_friendship.first().get_invitations
      friender_attendances = friender_friendship.first().get_attendances
      friender_friendship.each {|el| el.destroy}
      if friender_invitations.size > 0
        friender_invitations.first.destroy_all
      end
      if friender_attendances.size > 0
        friender_attendances.first.destroy_all
      end
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