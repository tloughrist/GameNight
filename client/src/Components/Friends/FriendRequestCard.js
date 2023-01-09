import './Friends.css';
import React, { useEffect, useState } from "react";
import { useToggle } from "../../CustomHooks/Toggle.js";

let requestorDisplay = <p>Loading...</p>

function FriendRequestCard({ currentUser, request, requestsLoaded, fetchFriends, fetchFriendRequests }) {

  const [requestor, setRequestor] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isToggled, toggle] = useToggle(false);

  useEffect(() => {
    if (!isInitialRender) {
      async function fetchRequestor() {
        const response = await fetch(`/users/${request.requestor_id}`);
        if (response.ok) {
          const requestor = await response.json();
          setRequestor(requestor);
          setIsLoaded(true);
        }
      };
      fetchRequestor();
    } else {
      setIsInitialRender(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestsLoaded]);

  function handleAccept() {
    fetch("/friendships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
          user_id: currentUser.id,
          friend_id: request.requestor_id
       }),
    });
    handleReject();
  };

  async function handleReject() {
    await fetch(`/friend_requests/${request.id}`, {
          method: "DELETE"
    });
    fetchFriends();
    toggle();
  };

  if (isLoaded) {
    requestorDisplay =
      <>
        <p>{requestor.name}</p>
        <p>{requestor.username}</p>
        <button onClick={(e) => handleAccept()}>Accept Request</button>
        <button onClick={(e) => handleReject()}>Reject Request</button>
      </>
  }

  return (
    <div className="card">
      {requestorDisplay}
    </div>
  )
};

export default FriendRequestCard;