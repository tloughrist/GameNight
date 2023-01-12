import './Friends.css';
import React, { useContext } from "react";
import { CurrentUserContext } from '../../App';

function FriendRequestCard({ request, setFriends }) {

  const currentUser = useContext(CurrentUserContext);

  console.log(request)

  function handleAccept() {
    fetch("/friendships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
          friendee_id: currentUser.id,
          friender_id: request.sender_id
       }),
    });
    handleReject();
  };

  async function handleReject() {
    const response = await fetch(`/friend_requests/${request.request_id}`, {
          method: "DELETE"
    });
    const frnds = await response.json();
    setFriends(frnds);
  };

  return (
    <div className="card">
      <>
        <p>{request.sender_name}</p>
        <p>{request.sender_username}</p>
        <button onClick={(e) => handleAccept()}>Accept Request</button>
        <button onClick={(e) => handleReject()}>Reject Request</button>
      </>
    </div>
  );
};

export default FriendRequestCard;