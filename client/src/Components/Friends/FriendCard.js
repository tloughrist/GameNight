import './Friends.css';
import React, { useState } from "react";
import Popup from 'reactjs-popup';

let friendDisplay = <h2>Loading...</h2>

function FriendCard({ friend, friendsLoaded, fetchFriends, currentUser }) {
  
  const [topic, setTopic] = useState();
  const [body, setBody] = useState();

  async function handleMessage(e) {
    e.preventDefault();
    const res = await fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        sender_id: currentUser.id,
        receiver_id: friend.id,
        topic: topic, 
        body: body
       }),
    });
    const message = await res.json();
    if (message.errors) {
      alert(message.errors)
    }
  };

  async function handleUnfriend() {
    await fetch(`users/${currentUser.id}/friends/${friend.id}`, {
      method: "DELETE"
    });
    fetchFriends();
  };

  if (friendsLoaded) {
    friendDisplay =
      <>
        <p>{friend.name}</p>
        <p>{friend.username}</p>
        <p>{friend.pronouns}</p>
        <p>{friend.blurb}</p>
        <div>
          <Popup
                  key={`${friend.id}popup`}
                  trigger={<button className={"button-element"}>Send Message</button>}
                  position="top left"
          >
            <form onSubmit={(e) => handleMessage(e)}>
              <label htmlFor={`${friend.id}topic`}>Topic</label>
              <input
                type="text"
                name={`${friend.id}topic`}
                onChange={(e) => setTopic(e.target.value)} 
              />
              <label htmlFor={`${friend.id}body`}>Message</label>
              <textarea
                name={`${friend.id}body`}
                placeholder="500 character limit"
                onChange={(e) => setBody(e.target.value)} 
              /> 
              <input type="submit" className={"button-element"} value="Send"></input>
            </form>
          </Popup>
        </div>
        <button onClick={(e) => handleUnfriend()}>Unfriend</button>
      </>
  }

  return (
    <div className="card">
      {friendDisplay}
    </div>
  )
}

export default FriendCard;