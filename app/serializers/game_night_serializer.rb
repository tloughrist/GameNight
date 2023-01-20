class GameNightSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :originator_id, :location, :title, :brought_games, :role

  belongs_to :originator

  def brought_games
    attendee_games = object.attendances.map {|attendance| {
      owner: attendance.attendee.name,
      games: attendance.attendee.game_night_games.where(game_night_id: object.id).map {|gng| gng.game.title}
    }}
    originator_games = {
      owner: object.originator.name,
      games: object.originator.game_night_games.where(game_night_id: object.id).map {|gng| gng.game.title} 
    }
    brought_games = attendee_games << originator_games
    return attendee_games
  end

  def role
    user_id = @instance_options[:option_user_id].to_i
    attendee_ids = object.attendees.map {|attendee| attendee.id}
    if object.originator_id == user_id
      return "originator"
    elsif attendee_ids.include? user_id
      return "attendee"
    else
      return "invitee"
    end
  end

end
