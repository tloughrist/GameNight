import './GameNights.css';
import React from "react";

function InviteeCard({ invitee, invitees, night, setInvitees }) {

  async function handleDelete(inviteeId, gameNightId) {
    if (window.confirm(`Are you sure you want to uninvite ${invitee.name}?`)) {
      await fetch(`/uninvite/${inviteeId}/${gameNightId}`, {
          method: "DELETE"
      });
      const inviteesSans = invitees.filter((invite) => invite.id !== invitee.id);
      setInvitees(inviteesSans);
    };
  };

  return(
    <div>
      <p>{invitee.name}!</p>
      <button onClick={e => handleDelete(invitee.id, night.id)}>Uninvite</button>
    </div>
  );
}

export default InviteeCard;