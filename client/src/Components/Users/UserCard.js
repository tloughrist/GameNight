import './Users.css';
import React from "react";

function UserCard({ currentUser, user, friends }) {

  let friendRequest = <button onClick={(e) => handleFriendRequest(currentUser, user)}>Send Friend Request</button>

  const hasFriend = friends.filter(obj => {
    return obj.username === user.username
  })

  if (hasFriend.length > 0) {
    friendRequest = <h3>Friend!</h3>
  }

  async function handleFriendRequest(requestor, receiver) {
    await fetch("/friend_requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            requestor_id: requestor.id,
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
