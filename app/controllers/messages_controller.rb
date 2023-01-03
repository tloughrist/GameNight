class MessagesController < ApplicationController

  before_action :authorize

  def create
    message = Message.create(messsage_params)
    if message.valid?
      render json: message, status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    message = Message.find_by(id: params[:id])
      if message
        render json: message
      else
        render json: { error: "Message not found" }, status: :not_found
      end
  end

  def destroy
      message = Message.find_by(id: params[:id])
      message.delete
      head :no_content
  end

  private

  def message_params
      params.permit(:sender_id, :receiver_id, :topic, :body)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end