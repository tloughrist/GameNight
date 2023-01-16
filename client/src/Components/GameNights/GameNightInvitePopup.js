import React, { useState, useContext, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FriendsContext } from "../../App.js";

function GameNightInvitePopup({ night, invitees, setInvitees }) {

  const [inviteesHolder, setInviteesHolder] = useState([]);

  const friends = useContext(FriendsContext);

  useEffect(() => {
    setInviteesHolder(invitees)
  }, [invitees]);

  //this is buggy
  function handleInvitees(id) {
    inviteesHolder.indexOf(id) !== -1 ?
      setInviteesHolder(inviteesHolder.filter((invitee) => invitee !== parseInt(id)))
    : setInviteesHolder([...inviteesHolder, parseInt((id))]);
  };

  function handleSendInvites() {

  };



  console.log(night.title)
  console.log(invitees)
  console.log(inviteesHolder)
  console.log(inviteesHolder.indexOf(6))
  console.log(friends)
  
  return (
    <Popup trigger={<button>Send Invites</button>} position="right center">
      <form onSubmit={(e) => handleSendInvites(e, night.id)}>
        {
          friends.length > 0 ?
            <div>
              {friends.map((friend) =>
                <div key={`friend${friend.id}`}>
                  <label htmlFor={friend.id}>{friend.name} / {friend.username}</label>
                  <input
                    type="checkbox"
                    name={friend.id}
                    value={friend.id}
                    checked={inviteesHolder.indexOf(friend.id) !== -1 ? true : false}
                    onChange={(e) => handleInvitees(e.target.value)}
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