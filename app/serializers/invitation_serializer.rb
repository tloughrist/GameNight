class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :game_night_id, :receiver_id, :sender_id
end
