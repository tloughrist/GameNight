import React from "react";

function InvitationCard({ invitation, setInvitations, setAttendances }) {

  return(
    <div>
      <p>{invitation.night.title}</p>
    </div>
  );
}

//      <button onClick={e => handleDelete(attendee.id, night.id)}>Uninvite</button>


export default InvitationCard;