class GameNightPackageSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :originator_id, :location, :title

end
