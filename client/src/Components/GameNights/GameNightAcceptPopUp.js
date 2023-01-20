import React, { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { CurrentUserContext } from "../../App.js";

function GameNightAcceptPopup({ night, nights, setGameNights, setAttendances }){
  
  const [certainty, setCertainty] = useState("");

  const currentUser = useContext(CurrentUserContext);

  async function handleAcceptance(e, nightId, attendeeId, certainLvl) {
    e.preventDefault();
    const attendRes = await fetch(`/attendances`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          game_night_id: nightId,
          attendee_id: attendeeId,
          certainty: certainLvl
            }),
        });
    if (attendRes.ok) {
      const attndncs = await attendRes.json();
      setAttendances(attndncs);
    } else {
      alert(attendRes.errors);
    }
  };

  return( 
    <Popup trigger={<button>Accept Invitation</button>} position="right center">
      <form onSubmit={(e) => handleAcceptance(e, night.id, currentUser.id, certainty)}>
        <label htmlFor="title">
            How Certain are You?
        </label>
        <input
            type="text"
            name="certainty"
            autoComplete="certainty"
            value={certainty}
            onChange={(e) => setCertainty(e.target.value)}
        />
        <button type="submit">Send Acceptance</button>
      </form>
    </Popup>
  );
};

export default GameNightAcceptPopup;