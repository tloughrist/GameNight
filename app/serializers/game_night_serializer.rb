class GameNightSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :location, :title, :role

  belongs_to :originator

  def role
    user_id = @instance_options[:option_user_id].to_i
    attendee_ids = object.attendees.map {|attendee| attendee.id}
    if object.originator_id == user_id
      return "originator"
    elsif attendee_ids.include? user_id
      return "attendee"
    else
      return "invitee"
    end
  end

end
