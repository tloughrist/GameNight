import './Friends.css';
import React, { useContext } from "react";
import { CurrentUserContext, FriendsContext } from '../../App';

function FriendRequestCard({ request, setFriends, setFriendRequests }) {

  const currentUser = useContext(CurrentUserContext);
  const friends = useContext(FriendsContext);

  async function handleAccept() {
    const response = await fetch("/friendships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
          friendee_id: currentUser.id,
          friender_id: request.sender_id
       }),
    });
    if (response.ok) {
      const frnd = await response.json();
      setFriends([...friends, frnd]);
      handleReject();
    } else {
      alert(response.error);
    }
  };

  async function handleReject() {
    const response = await fetch(`/friend_requests/${request.request_id}`, {
          method: "DELETE"
    });
    const reqs = await response.json();
    setFriendRequests(reqs);
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