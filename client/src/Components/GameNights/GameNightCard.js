import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../App.js";
import GameNightEditPopup from "./GameNightsEditPopup.js";
import GameNightInvitePopup from "./GameNightInvitePopup.js";
import InviteeCard from "./GameNightInvitees.js";
import AttendeeCard from "./GameNightAttendee.js";
import moment from 'moment';

function GameNightCard({ night, nights, setOriginatedNights }) {

  const [invitees, setInvitees] = useState([]);
  const [attendees, setAttendees] = useState([]);

  const currentUser = useContext(CurrentUserContext);

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

  function handleMessage(nightId) {
    
  };

  function handleGameSelect() {

  };

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
                  key={`attendee${attendee.id}`}
                  attendee={attendee}
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
                  night={night}
                  setInvitees={setInvitees}
                />
              )}
            </div>
          : <p>No invitations yet.</p>
        }
      </div>
      <div>
        <h3>Games</h3>
        <p>No games yet.</p>
      </div>
      <GameNightEditPopup 
        nights={nights}
        night={night}
        setOriginatedNights={setOriginatedNights} 
      />
      <GameNightInvitePopup
        night={night}
        invitees={invitees}
        setInvitees={setInvitees}
       />
      <button onClick={(e) => handleMessage(night.id)}>Send Message to Attendees</button>
      <button onClick={(e) => handleGameSelect()}>Select Games to Bring</button>
    </div>
  );
}

export default GameNightCard;