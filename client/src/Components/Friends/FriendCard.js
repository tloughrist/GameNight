import './Friends.css';
import React, { useState, useContext } from "react";
import Popup from 'reactjs-popup';
import GameNightOption from './FriendsGameNightOption.js';
import { CurrentUserContext } from '../../App';

function FriendCard({ friend, setFriends, gameNights }) {
  
  const [topic, setTopic] = useState();
  const [body, setBody] = useState();

  const currentUser = useContext(CurrentUserContext);

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
        body: body,
      }),
    });
    const message = await res.json();
    if (message.errors) {
      alert(message.errors)
    }
  };

  async function handleUnfriend(userId, friendId) {
    console.log(friend)
    const response = await fetch(`friendships/${userId}/${friendId}`, {
      method: "DELETE"
    });
    const frnds = await response.json();
    setFriends(frnds);
  };

  return (
    <div className="card">
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
            <label htmlFor={"game_night_message"}>Regarding Game Night</label>
            <select id="game_night_dropdown" name="game_night_message">
              <option value="11">None</option>
              {gameNights.map((night) =>
                <GameNightOption
                  key={`gamenight${night.id}`}
                  night={night}
                />
              )}
            </select>
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
      <button onClick={(e) => handleUnfriend(currentUser.id, friend.id)}>Unfriend</button>
    </div>
  )
}

export default FriendCard;