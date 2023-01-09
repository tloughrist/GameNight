class MessageSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :receiver_id, :topic, :body, :game_night_id, :created_at

  belongs_to :sender, serializer: UserNameSerializer
end
