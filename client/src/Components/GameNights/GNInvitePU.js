import './GameNights.css';
import React, { useState, useContext, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FriendsContext } from "../../App.js";
import InviteeOption from "./GNInviteeOption.js";

function GameNightInvitePopup({ night, invitees, setInvitees, attendees }) {

  const [inviteesHolder, setInviteesHolder] = useState([]);
  const [inviteeIds, setInviteeIds] = useState([]);
  const [attendeeIds, setAttendeeIds] = useState([]);
  const [friendsFiltered, setFriendsFiltered] = useState([]);

  const friends = useContext(FriendsContext);

  useEffect(() => {
    if (Array.isArray(invitees)) {
      setInviteesHolder(invitees)
      setInviteeIds(invitees.map((invitee) => invitee.id))
    }
    if (Array.isArray(attendees)) {
      setAttendeeIds(attendees.map((attendee) => attendee.id))
    }
  }, [invitees, attendees]);

  useEffect(() => {
    if (friends.length > 0) {
      const filtered = friends.filter((friend) => {
        function checkIds(array, friendId) {
          return array.indexOf(friendId) === -1;
        };
        const inviteeExists = !checkIds(inviteeIds, friend.id);
        const attendeeExists = !checkIds(attendeeIds, friend.id);
        return !inviteeExists && !attendeeExists; 
      });
      setFriendsFiltered(filtered);
    }
  }, [friends, inviteeIds, attendeeIds])

  function handleSendInvites(e) {
    e.preventDefault();
    console.log(night)
    const newInvitees = inviteesHolder.filter((invitee) => inviteeIds.indexOf(invitee.id) === -1);
    newInvitees.map(async (invitee) => {
      const res = await fetch("/invitations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          game_night_id: night.id,
          receiver_id: invitee.id,
          sender_id: night.originator.id
        }),
      });
      if (res.ok) {
        const updatedInvitees = await res.json();
        setInvitees(updatedInvitees);
      } else {
        alert(res.errors)
      }
    });
  };

  return (
    <Popup trigger={<button className="navlink card_button">send invites</button>} position="right center" contentStyle={{width: "250px"}}>
      <form onSubmit={(e) => handleSendInvites(e, night.id)}>
        {
          friendsFiltered.length > 0 ?
            <div>
              {friendsFiltered.map((friend) =>
                <div key={`friend${friend.id}`}>
                  <InviteeOption 
                    friend={friend}
                    inviteesHolder={inviteesHolder}
                    setInviteesHolder={setInviteesHolder}
                  />
                </div>
              )}
            </div>
          : <>no uninvited friends</>
        }
        <button className="navlink card_button" id="popup_button4" type="submit">submit</button>
      </form>
    </Popup>
  );

}

export default GameNightInvitePopup;