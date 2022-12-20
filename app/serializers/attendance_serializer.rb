class AttendanceSerializer < ActiveModel::Serializer
  attributes :id, :game_night_id, :attendee_id, :certainty
end
