class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :no_players, :duration_minutes, :complexity, :originator_id
end
