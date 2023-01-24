import './GameNights.css';
import React, { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { CurrentUserContext } from "../../App.js";

function GameNightAcceptPopup({ night, setAttendingNights, setAttendances, invitedNights, setInvitedNights, handleDelete }){

  const [certainty, setCertainty] = useState("");

  const currentUser = useContext(CurrentUserContext);
  async function handleAcceptance(e) {
    e.preventDefault();
    const attendRes = await fetch(`/attendances`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        game_night_id: night.id,
        attendee_id: currentUser.id,
        certainty: certainty
      }),
    });
    if (attendRes.ok) {
      const nights = await attendRes.json();
      setAttendingNights(nights.nights);
      setAttendances(nights.attendances);
      const invitedNightsSans = invitedNights.filter((invitedNight) => invitedNight.id !== night.id);
      setInvitedNights(invitedNightsSans);
      handleDelete();
    } else {
      alert(attendRes.errors);
    }
  };

  return( 
    <Popup trigger={<button className="navlink card_button">gladly accept</button>} position="right center">
      <form onSubmit={handleAcceptance}>
        <label htmlFor="title">
            how certain are you?
        </label>
        <input
            type="text"
            name="certainty"
            autoComplete="certainty"
            value={certainty}
            onChange={(e) => setCertainty(e.target.value)}
        />
        <button className="navlink card_button" id="popup_button3" type="submit">send acceptance</button>
      </form>
    </Popup>
  );
};

export default GameNightAcceptPopup;