import './Friends.css';
import React, { useContext } from "react";
import { CurrentUserContext, FriendsContext } from '../../App';

function FriendCard({ friend, setFriends }) {
  
  const currentUser = useContext(CurrentUserContext);
  const friends = useContext(FriendsContext);

  async function handleUnfriend(userId, friendId) {
    await fetch(`friendships/${userId}/${friendId}`, {
      method: "DELETE"
    });
    const friendsSans = friends.filter ((frnd) => frnd.id !== friendId);
    setFriends(friendsSans);
  };

  return (
    <div className="card">
      <p><b>{friend.name}</b></p>
      <p>{friend.username}</p>
      <p>{friend.pronouns}</p>
      <p>{friend.blurb}</p>
      <button className="navlink" onClick={(e) => handleUnfriend(currentUser.id, friend.id)}>unfriend</button>
    </div>
  )
}

export default FriendCard;