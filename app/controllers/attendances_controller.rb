class AttendancesController < ApplicationController

  before_action :authorize

  def create
    attend = Attendance.create(attendance_params)
    if attend.valid?
      user = User.find(params[:attendee_id])
      attendances = user.attendances
      nights = attendances.map {|attendance| {id: attendance.game_night.id, date: attendance.game_night.date, time: attendance.game_night.time, location: attendance.game_night.location, title: attendance.game_night.title, originator: {name: attendance.game_night.originator.name, username: attendance.game_night.originator.username}}}
      packages = attendances.map {|attendance| {id: attendance.id, night: attendance.game_night, originator: {name: attendance.game_night.originator.name, username: attendance.game_night.originator.username}, certainty: attendance.certainty, attendee_id: attendance.attendee_id}}
      render json: {nights: nights, attendances: packages}, status: :ok
    else
      render json: { errors: attend.errors.full_messages }, status: :unprocessable_entity
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

  def fetch
    user = User.find(params[:user_id])
    attendances = user.attendances
    packages = attendances.map {|attendance| {id: attendance.id, night: attendance.game_night, originator: {name: attendance.game_night.originator.name, username: attendance.game_night.originator.username}, certainty: attendance.certainty, attendee_id: attendance.attendee_id}}
    render json: packages, status: :ok
  end

  def destroy
    attendance = Attendance.find_by(attendee_id: params[:attendee_id], game_night_id: params[:game_night_id])
    attendance.delete
    attendances = Attendance.where(game_night_id: params[:game_night_id]).all
    attendees = attendances.map {|attendance| attendance.attendee}
    render json: attendees, status: :created
  end

  private

  def attendance_params
      params.permit(:game_night_id, :attendee_id, :certainty)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end
