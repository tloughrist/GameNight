import './Users.css';
import React, { useContext } from "react";
import { CurrentUserContext, FriendsContext } from '../../App';
 
function UserCard({ user }) {

  const friends = useContext(FriendsContext);
  const currentUser = useContext(CurrentUserContext);

  let friendRequest = <button onClick={(e) => handleFriendRequest(currentUser, user)}>Send Friend Request</button>

  const hasFriend = friends.filter(obj => {
    return obj.username === user.username
  });

  if (hasFriend.length > 0) {
    friendRequest = <h3>Friend!</h3>
  }

  async function handleFriendRequest(sender, receiver) {
    await fetch("/friend_requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            sender_id: sender.id,
            receiver_id: receiver.id
        }),
      });
  };

  return (
    <div className="card">
      <p>{user.name}</p>
      <p>{user.username}</p>
      {friendRequest}
    </div>
  )
};

export default UserCard;