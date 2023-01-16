import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../App.js";
import GameNightEditPopup from "./GameNightsEditPopup.js";
import GameNightInvitePopup from "./GameNightInvitePopup.js"

function GameNightCard({ night, nights, setGameNights }) {

  const [invitees, setInvitees] = useState([]);
  const [attendees, setAttendees] = useState([]);

  const currentUser = useContext(CurrentUserContext);

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

  function handleMessage(nightId) {
    
  };

  function handleGameSelect() {

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
      <GameNightEditPopup 
        nights={nights}
        night={night}
        setGameNights={setGameNights} 
      />
      <GameNightInvitePopup
        night={night}
        invitees={invitees}
        setInvitees={setInvitees}
       />
      <button onClick={(e) => handleMessage(night.id)}>Send Message to Attendees</button>
      <button onClick={(e) => handleGameSelect()}>Select Games to Bring</button>
    </div>
  );
}

export default GameNightCard;