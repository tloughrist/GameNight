import './Friends.css';
import React, { useContext } from "react";
import { CurrentUserContext } from '../../App';

function FriendCard({ friend, setFriends }) {
  
  const currentUser = useContext(CurrentUserContext);

  async function handleUnfriend(userId, friendId) {
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
      <button onClick={(e) => handleUnfriend(currentUser.id, friend.id)}>Unfriend</button>
    </div>
  )
}

export default FriendCard;