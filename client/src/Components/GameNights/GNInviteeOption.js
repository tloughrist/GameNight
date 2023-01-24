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
    <div key={`friend${friend.id}`} className="invitee_option">
      <label className="invitee_label" htmlFor={friend.id} contentStyle={{width: "100px"}}>{friend.name} / {friend.username}
        <input
          type="checkbox"
          name={friend.id}
          value={friend}
          checked={checked}
          onChange={(e) => handleInvitees(e.target.value)}
          contentStyle={{width: "15px"}}
        />
      </label>
    </div>
  );
}

export default InviteeOption;