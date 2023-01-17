import React from "react";

function InviteeCard({ invitee, night, setInvitees }) {

  async function handleDelete(inviteeId, gameNightId) {
    if (window.confirm(`Are you sure you want to uninvite ${invitee.name}?`)) {
      const res = await fetch(`/uninvite/${inviteeId}/${gameNightId}`, {
          method: "DELETE"
      });
      const invitees = await res.json();
      setInvitees(invitees);
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