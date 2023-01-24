import './Users.css';
import React, { useContext, useState } from "react";
import { CurrentUserContext, FriendsContext } from '../../App';
 
function UserCard({ user }) {

  const [hasRequest, setHasRequest] = useState(user.requests)

  const friends = useContext(FriendsContext);
  const currentUser = useContext(CurrentUserContext);

  const isFriend = friends.filter((friend) => {
    return friend.id === user.user.id
  }).length;

  async function handleFriendRequest(sender, receiver) {
    const response = await fetch("/friend_requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
              sender_id: sender.id,
              receiver_id: receiver.id
          }),
        });
    if (response.ok) {
      setHasRequest(true);
    } else {
      alert(response.error);
    }
  };

  return (
    <div className="card">
      <p>{user.user.name}</p>
      <p>{user.user.username}</p>
      {
        isFriend > 0?
          <h3>Friend!</h3>
        : hasRequest?
            <h3>Friend request pending.</h3>
          : currentUser.id === user.user.id?
              <></>
            : <button className="navlink" onClick={(e) => handleFriendRequest(currentUser, user.user)}>Send Friend Request</button>
      }
    </div>
  )
};

export default UserCard;