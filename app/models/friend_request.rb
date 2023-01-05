class FriendRequest < ApplicationRecord
    belongs_to :requestor, class_name: :User
    belongs_to :receiver, class_name: :User

    validates :receiver_id, uniqueness: { scope: :requestor_id, message: "has request pending" }

end
