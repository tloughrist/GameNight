class GameNightGameSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :game_night_id, :attendee_id

  belongs_to :game
  belongs_to :game_night
  belongs_to :attendee
  
end
