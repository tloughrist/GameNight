class UserGameSerializer < ActiveModel::Serializer
  attributes :id, :owner_id, :game_id
end
