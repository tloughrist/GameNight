import './Friends.css';
import React, { useEffect, useState, useContext } from "react";
import { useToggle } from "../../CustomHooks/Toggle.js";
import { CurrentUserContext } from '../../App';

let requestDisplay = <p>Loading...</p>

function FriendRequestCard({ request, requestsLoaded, fetchFriends, fetchFriendRequests }) {

  const [sender, setSender] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isToggled, toggle] = useToggle(false);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (request) {
      async function fetchSender() {
        const response = await fetch(`/friend_requests/${request.id}/sender`);
        if (response.ok) {
          const sendr = await response.json();
          setSender(sendr);
          setIsLoaded(true);
        } else {
          alert(response.error);
          //needs cleanup function
        }
      };
      fetchSender();
    } else {
      return;
    }
  }, []);

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

  useEffect(() => {
    if (isLoaded) {
      requestDisplay =
        <>
          <p>{sender.name}</p>
          <p>{sender.username}</p>
          <button onClick={(e) => handleAccept()}>Accept Request</button>
          <button onClick={(e) => handleReject()}>Reject Request</button>
        </>
    }
    toggle();
  }, [isLoaded])

  return (
    <div className="card">
      {requestDisplay}
    </div>
  )
};

export default FriendRequestCard;