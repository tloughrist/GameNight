import './GameNights.css';
import React from "react";

function AttendeeCard({ attendee, attendees, night, setAttendees }) {

  async function handleDelete(attendeeId, gameNightId) {
    if (window.confirm(`Are you sure you want to uninvite ${attendee.attendee.name}?`)) {
      await fetch(`/unattend/${attendeeId}/${gameNightId}`, {
          method: "DELETE"
      });
      const attendeesSans = attendees.filter((attend) => attend.attendee.id !== attendee.attendee.id);
      setAttendees(attendeesSans);
    };
  };

  return(
    <div>
      <p>{attendee.attendee.name} / {attendee.attendee.username}</p>
      <p>Certainty Level: {attendee.certainty}</p>
      <button className="navlink card_button" onClick={e => handleDelete(attendee.attendee.id, night.id)}>Uninvite</button>
    </div>
  );
}

export default AttendeeCard;