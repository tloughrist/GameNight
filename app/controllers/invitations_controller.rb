class InvitationsController < ApplicationController

  before_action :authorize

  def create
    existing_invitation = Invitation.find_by(receiver_id: params[:receiver_id], game_night_id: params[:game_night_id])
    if !existing_invitation
      invitation = Invitation.create(invitation_params)
      if invitation.valid?
        invitations = Invitation.where(game_night_id: params[:game_night_id]).all
        invitees = invitations.map {|invitation| invitation.receiver}
        render json: invitees, status: :created
      else
        render json: { errors: invitation.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def show
    invitation = Invitation.find_by(id: params[:id])
      if invitation
        render json: invitation
      else
        render json: { error: "invitation not found" }, status: :not_found
      end
  end

  def fetch
    user = User.find(params[:user_id])
    invitations = user.receiver_invitations
    packages = invitations.map {|invitation| {id: invitation.id, night: invitation.game_night, sender: invitation.sender.name}} 
    render json: packages, status: :ok
  end

  def destroy
      invitation = Invitation.find_by(receiver_id: params[:invitee_id], game_night_id: params[:game_night_id])
      if invitation.receiver_id == session[:user_id] || invitation.sender_id == session[:user_id]
        invitation.delete
        invitations = Invitation.where(game_night_id: params[:game_night_id]).all
        invitees = invitations.map {|invitation| invitation.receiver}
        render json: invitees, status: :created
      else
        return render json: { error: "Not authorized" }, status: :unauthorized
      end
  end

  private

  def invitation_params
      params.permit(:sender_id, :receiver_id, :game_night_id)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end
