class InvitationsController < ApplicationController

  before_action :authorize

  def create
    invitation = Invitation.create(invitation_params)
    if invitation.valid?
      render json: invitation, status: :created
    else
      render json: { errors: invitation.errors.full_messages }, status: :unprocessable_entity
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

  def destroy
      invitation = Invitation.find_by(id: params[:id])
      invitation.delete
      head :no_content
  end

  private

  def invitation_params
      params.permit(:sender_id, :receiver_id, :game_night_id)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end
