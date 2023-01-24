import './GameNights.css';
import React, { useContext } from 'react';
import 'reactjs-popup/dist/index.css';
import { CurrentUserContext } from "../../App.js";
import GameNightAcceptPopUp from "./InviteAcceptPU.js";
import moment from 'moment';

function InvitationCard({ night, invitedNights, setInvitedNights, setAttendances, setAttendingNights}) {

  const currentUser = useContext(CurrentUserContext);

  async function handleDelete() {
    await fetch(`/uninvite/${currentUser.id}/${night.id}`, {
      method: "DELETE"
    });
    const invitedNightsSans = invitedNights.filter((invitedNight) => invitedNight.id !== night.id);
    setInvitedNights(invitedNightsSans);
  };

  return(
    <div className="card">
      <h3>{night.title}</h3>
      <p><b>when:</b> {moment(night.date, "YYYY:MM:DD").format("MM/DD/YYYY")} at {moment(night.time, "hh:mm").format("hh:mm a")}</p>
      <p><b>where: </b>{night.location}</p>
      <p><b>host: </b>{night.originator.name}/{night.originator.username}</p>
      <GameNightAcceptPopUp
        night={night}
        invitedNights={invitedNights}
        setInvitedNights={setInvitedNights}
        setAttendances={setAttendances}
        setAttendingNights={setAttendingNights}
        handleDelete={handleDelete}

      />
      <button className="navlink card_button"  onClick={e => handleDelete(night.id)}>regretfully decline</button>
    </div>
  );
}

export default InvitationCard;