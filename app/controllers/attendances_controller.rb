class AttendancesController < ApplicationController

  before_action :authorize

  def create
      attendance = Attendance.create(attendance_params)
      if attendance.valid?
        render json: attendance, status: :created
      else
        render json: { errors: attendance.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def update
      attendance = Attendance.find_by(id: params[:id])
      attendance.update(attendance_params)
      if attendance.valid?
        render json: attendance, status: :accepted
      else
        render json: { errors: attendance.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def destroy
      attendance = Attendance.find_by(id: params[:id])
      attendance.delete
      head :no_content
  end

  private

  def attendance_params
      params.permit(:game_night_id, :attendee_id, :certainty)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end
