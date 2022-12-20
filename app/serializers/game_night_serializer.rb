class GameNightSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :owner_id, :location
end
