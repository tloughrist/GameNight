class FriendRequestSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :receiver_id
end
