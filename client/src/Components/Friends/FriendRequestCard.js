import './Friends.css';
import React, { useContext } from "react";
import { CurrentUserContext, FriendsContext } from '../../App';

function FriendRequestCard({ request, friendRequests, setFriends, setFriendRequests }) {

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
    await fetch(`/friend_requests/${request.request_id}`, {
          method: "DELETE"
    });
    const friendRequestsSans = friendRequests.filter((friendRequest) => friendRequest.sender_id !== request.sender_id);
    setFriendRequests(friendRequestsSans);
  };

  return (
    <div className="card">
      <p><b>{request.sender_name}</b></p>
      <p>{request.sender_username}</p>
      <button className="navlink"  onClick={(e) => handleAccept()}>accept request</button>
      <button className="navlink"  onClick={(e) => handleReject()}>reject request</button>
    </div>
  );
};

export default FriendRequestCard;