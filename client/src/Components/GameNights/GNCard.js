import './GameNights.css';
import React, { useState, useEffect } from "react";
import GameNightEditPopup from "./GNEditPU.js";
import GameNightInvitePopup from "./GameNightInvitePopup.js";
import InviteeCard from "./GNInvitees.js";
import AttendeeCard from "./GNAttendees.js";
import moment from 'moment';

function GameNightCard({ night, originatedNights, setOriginatedNights }) {

  const [invitees, setInvitees] = useState([]);
  const [attendees, setAttendees] = useState([]);

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

  return (
    <div className="card">
      <h2>{night.title}</h2>
      <p><b>When:</b> {moment(night.date, "YYYY:MM:DD").format("MM/DD/YYYY")} at {moment(night.time, "hh:mm").format("hh:mm a")}</p>
      <p><b>Where:</b> {night.location}</p>
      <div>
        <h3>Attendees</h3>
        {
          attendees.length > 0 ?
            <div>
              {attendees.map((attendee) => 
                <AttendeeCard
                  key={`attendee${attendee.attendee.id}`}
                  attendee={attendee}
                  attendees={attendees}
                  night={night}
                  setAttendees={setAttendees}
                />
              )}
            </div>
          : <p>No invitations yet.</p>
        }
      </div>
      <div>
        <h3>Invitees</h3>
        {
          invitees.length > 0 ?
            <div>
              {invitees.map((invitee) => 
                <InviteeCard
                  key={`invitee${invitee.id}`}
                  invitee={invitee}
                  invitees={invitees}
                  night={night}
                  setInvitees={setInvitees}
                />
              )}
            </div>
          : <p>No invitations yet.</p>
        }
      </div>
      <GameNightEditPopup 
        originatedNights={originatedNights}
        night={night}
        setOriginatedNights={setOriginatedNights} 
      />
      <GameNightInvitePopup
        night={night}
        invitees={invitees}
        setInvitees={setInvitees}
        attendees={attendees}
       />
    </div>
  );
}

export default GameNightCard;