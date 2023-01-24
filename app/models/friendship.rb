class Friendship < ApplicationRecord
    belongs_to :friender, class_name: :User
    belongs_to :friendee, class_name: :User

    validates :friender_id, uniqueness: { scope: :friendee_id, message: "already a friend"}
    validates :friendee_id, uniqueness: { scope: :friender_id, message: "already a friend" }

    def get_attendances
        friender_origin_nights = friender.originator_game_nights
        friendee_attend_nights = friendee.attendee_game_nights
        friender_origin_intersection = (friender_origin_nights)&(friendee_attend_nights)
        friender_origin_attendances = friender_origin_intersection.map {|night|
            night.attendances.where(attendee_id: friendee.id)
        }
        friendee_origin_nights = friendee.originator_game_nights
        friender_attend_nights = friender.attendee_game_nights
        friendee_origin_intersection = (friendee_origin_nights)&(friender_attend_nights)
        friendee_origin_attendances = friendee_origin_intersection.map {|night|
            night.attendances.where(attendee_id: friender.id)
        }
        attendances = (friender_origin_attendances)+(friendee_origin_attendances)
    end

    def get_invitations
        reciever_invites = friender.receiver_invitations.where(sender_id: friendee.id)
        sender_invites = friender.sender_invitations.where(receiver_id: friendee.id)
        invitations = (reciever_invites)+(sender_invites)
    end

end
