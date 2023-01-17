import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../App.js";
import GameNightEditPopup from "./GameNightsEditPopup.js";
import GameNightInvitePopup from "./GameNightInvitePopup.js";
import InvitationCard from "./GameNightInvitations.js";

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

  return (
    <div className="card">
      <p><b>{night.title}</b></p>
      <p>Date: {night.date}</p>
      <p>Time: {night.time}</p>
      <p>Location: {night.location}</p>
      <p>Attendees: </p>
      <div>
        <h3>Invitees</h3>
        {
          invitees.length > 0 ?
            <div>
              {invitees.map((invitee) => 
                <InvitationCard
                  key={`invitee${invitee.id}`}
                  invitee={invitee}
                  night={night}
                  setInvitees={setInvitees}
                />
              )}
            </div>
          : <p>No invitations yet.</p>
        }
      </div>
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