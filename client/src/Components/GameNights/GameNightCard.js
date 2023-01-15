import React, { useState, useEffect, useContext } from "react";
import InviteeOption from "./GameNightInviteeOption.js";
import { CurrentUserContext, FriendsContext } from "../../App.js";

let friendDisplay = <></>;

function GameNightCard({ night, fetchGameNights }) {

  const [invitees, setInvitees] = useState([]);
  const [attendees, setAttendees] = useState([]);

  const currentUser = useContext(CurrentUserContext);
  const friends = useContext(FriendsContext);

  useEffect(() => {
    async function fetchData(nightId) {
      const inviteRes = await fetch(`game_nights/${nightId}/invitees`);
      const invitedUsers = await inviteRes.json();
      const attendRes = await fetch(`game_nights/${nightId}/attendees`);
      const attendingUsers = await attendRes.json();
      setAttendees(attendingUsers);
      setInvitees(invitedUsers);
    };
    fetchData(night.id);
  }, [night.id]);

  async function handleEdit() {

  };

  async function handleInvite() {
    friendDisplay =
      <div>
        <h3>Invite...</h3>
        {friends.map((friend) =>
          <InviteeOption
            key={`friend${friend.id}`}
            friend={friend}
            invitees={invitees}
            setInvitees={setInvitees}
          />
        )}
        <button onClick={(e) => handleSendInvite()}>Send Invitations</button>
        <button onClick={(e) => resetCard()}>Cancel</button>
      </div>;
  };

  function handleInvitee() {

  }

  function resetCard() {
    friendDisplay = <></>;
  }

  function handleMessage() {
    
  };

  function handleGameSelect() {

  };

  async function handleDelete() {
    await fetch(`game_nights/${night.id}`, {
      method: "DELETE"
    });
    fetchGameNights();
  };

  function handleSendInvite() {
    invitees.map(async (invitee) => {
      const res = await fetch("/invitations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          game_night_id: night.id,
          receiver_id: invitee,
          sender_id: currentUser.id
        }),
      });
    })
    
  };

  return (
    <div className="card">
      <p><b>{night.title}</b></p>
      <p>Date: {night.date}</p>
      <p>Time: {night.time}</p>
      <p>Location: {night.location}</p>
      <p>Attendees: </p>
      <p>Invitees: </p>
      <p>Games: </p>
      <button onClick={(e) => handleEdit()}>Edit</button>
      <button onClick={(e) => handleInvite()}>Send Invites</button>
      {friendDisplay}
      <button onClick={(e) => handleMessage()}>Send Message to Attendees</button>
      <button onClick={(e) => handleGameSelect()}>Select Games to Bring</button>
      <button onClick={(e) => handleDelete()}>Delete</button>
    </div>
  );
}

export default GameNightCard;