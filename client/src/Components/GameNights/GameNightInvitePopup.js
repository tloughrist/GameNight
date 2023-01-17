import React, { useState, useContext, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FriendsContext } from "../../App.js";
import InviteeOption from "./GameNightInviteeOption.js";

function GameNightInvitePopup({ night, invitees, setInvitees }) {

  const [inviteesHolder, setInviteesHolder] = useState([]);
  const [inviteeIds, setInviteeIds] = useState([]);

  const friends = useContext(FriendsContext);

  useEffect(() => {
    if (Array.isArray(invitees)) {
      setInviteesHolder(invitees)
      setInviteeIds(invitees.map((invitee) => invitee.id))
    }
  }, [invitees]);

  function handleSendInvites(e) {
    e.preventDefault();
    const newInvitees = inviteesHolder.filter((invitee) => inviteeIds.indexOf(invitee.id) === -1);
    console.log(newInvitees);
    newInvitees.map(async (invitee) => {
      const res = await fetch("/invitations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          game_night_id: night.id,
          receiver_id: invitee.id,
          sender_id: night.originator_id
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
    <Popup trigger={<button>Send Invites</button>} position="right center">
      <form onSubmit={(e) => handleSendInvites(e, night.id)}>
        {
          friends.length > 0 ?
            <div>
              {friends.map((friend) =>
                <div key={`friend${friend.id}`}>
                  <InviteeOption 
                    friend={friend}
                    inviteeIds={inviteeIds}
                    inviteesHolder={inviteesHolder}
                    setInviteesHolder={setInviteesHolder}
                  />
                </div>
              )}
            </div>
          : <>No friends...sorry!</>
        }
        <button type="submit">Submit</button>
      </form>
    </Popup>
  );

}

export default GameNightInvitePopup;