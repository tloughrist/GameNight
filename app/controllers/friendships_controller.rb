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
    sender_invitations = user.sender_invitations.where(receiver_id: friend.id)
    receiver_invitations = user.receiver_invitations.where(sender_id: friend.id)
    originator_game_nights = friend.attendee_game_nights.where(originator_id: user.id).all
    originator_attendances = originator_game_nights.map {|game_night| friend.attendances.where(game_night_id: game_night.id)}
    attendee_game_nights = user.attendee_game_nights.where(originator_id: friend.id)
    attendee_attendances = attendee_game_nights.map {|game_night| user.attendances.where(game_night_id: game_night.id)}
    friender_friendship.destroy_all
    friender_friendship.destroy_all
    sender_invitations.destroy_all
    receiver_invitations.destroy_all
    originator_attendances.each {|e| e.destroy_all}
    attendee_attendances.each {|e| e.destroy_all}
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