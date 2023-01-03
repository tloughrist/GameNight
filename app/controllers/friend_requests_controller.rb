class FriendRequestsController < ApplicationController

  before_action :authorize

  def create
    request = FriendRequest.create(request_params)
    if request.valid?
      render json: request, status: :created
    else
      render json: { errors: request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    request = FriendRequest.find_by(id: params[:id])
      if request
        render json: request
      else
        render json: { error: "Request not found" }, status: :not_found
      end
  end

  def destroy
      request = FriendRequest.find_by(id: params[:id])
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