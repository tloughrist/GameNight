class FriendRequestsController < ApplicationController

  before_action :authorize

  def create
    request = FriendRequest.create(requestor_id: params[:requestor_id], receiver_id: params[:receiver_id])
    if request.valid?
      render json: request, status: :created
    else
      render json: { errors: request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    requests = FriendRequest.where(receiver_id: params[:id]).all
    render json: requests
  end

  def destroy
      request = FriendRequest.find(params[:id])
      request.delete
      head :no_content
  end

  private

  def request_params
      params.permit(:requestor_id, :receiver_id)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end