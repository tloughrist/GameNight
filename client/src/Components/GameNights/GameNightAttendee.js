import React from "react";

function AttendeeCard({ attendee, night, setAttendees }) {

  async function handleDelete(attendeeId, gameNightId) {
    if (window.confirm(`Are you sure you want to uninvite ${attendee.name}?`)) {
      const res = await fetch(`/unattend/${attendeeId}/${gameNightId}`, {
          method: "DELETE"
      });
      const attendees = await res.json();
      setAttendees(attendees);
    };
  };

  return(
    <div>
      <p>{attendee.name}!</p>
      <button onClick={e => handleDelete(attendee.id, night.id)}>Uninvite</button>
    </div>
  );
}

export default AttendeeCard;