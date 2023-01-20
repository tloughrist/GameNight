import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { CurrentUserContext, GamesContext } from "../../App.js";
import GameNightAcceptPopUp from "./GameNightAcceptPopUp.js"

function InvitationCard({ night, setInvitations, setAttendances }) {

  async function handleDelete() {

  };

  return(
    <div className="card">
      <h3>{night.title}</h3>
      <p><b>Date: </b>{night.date}</p>
      <p><b>Time: </b>{night.time}</p>
      <p><b>Location: </b>{night.location}</p>
      <p><b>Host: </b>{night.originator.name}/{night.originator.username}</p>
      <GameNightAcceptPopUp 
        setAttendances={setAttendances}
      />
      <button onClick={e => handleDelete()}>Regretfully Decline</button>
    </div>
  );
}

//      <button onClick={e => handleDelete(attendee.id, night.id)}>Uninvite</button>


export default InvitationCard;