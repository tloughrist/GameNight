import './GameNights.css';
import React, {useState} from "react";

function InviteeOption({ friend, inviteesHolder, setInviteesHolder }) {

  const [checked, setChecked] = useState(false);

  function handleInvitees() {
    if (checked === false) {
      setInviteesHolder([...inviteesHolder, friend]);
    } else {
      const inviteesHolderSans = inviteesHolder.filter((invitee) => invitee.id !== friend.id);
      setInviteesHolder(inviteesHolderSans);
    }
    setChecked(!checked);
  };

  return(
    <div key={`friend${friend.id}`}>
      <label htmlFor={friend.id}>{friend.name} / {friend.username}</label>
      <input
        type="checkbox"
        name={friend.id}
        value={friend}
        checked={checked}
        onChange={(e) => handleInvitees(e.target.value)}
      />
    </div>
  );
}

export default InviteeOption;