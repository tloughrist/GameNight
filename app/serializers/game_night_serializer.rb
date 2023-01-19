class GameNightSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :originator_id, :location, :title

  has_many :attendances
  has_many :attendees, through: :attendances
  has_many :invitations
  has_many :invitees, through: :invitations
  has_many :game_night_games
  has_many :games, through: :game_night_games
end
