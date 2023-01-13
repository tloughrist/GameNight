class Friendship < ApplicationRecord
    belongs_to :friender, class_name: :User
    belongs_to :friendee, class_name: :User

    validates :friender_id, uniqueness: { scope: :friendee_id, message: "already a friend"}
    validates :friendee_id, uniqueness: { scope: :friender_id, message: "already a friend" }

end
