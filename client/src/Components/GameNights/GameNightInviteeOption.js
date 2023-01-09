import React, { useState, useEffect } from "react";

function InviteeOption({ friend, invitees, setInvitees }) {
  
  const [isChecked, setIsChecked] = useState(false);
  const [guest, setGuest] = useState();

  useEffect(() => {
    setGuest(invitees.find((invitee) => invitee === friend.id))
  }, []);
   
  useEffect(() => {
    guest? setIsChecked(true) : setIsChecked(false);
  }, [isChecked]);
    
  function handleCheck() {
    setIsChecked(!isChecked);
    if (!isChecked) {
      console.log("setInvitees");
      setInvitees([...invitees, friend.id]);
      setGuest(friend.id);
    } else {
      const inviteesSans = invitees.filter((invitee) => invitee !== friend.id);
      setInvitees(inviteesSans);
      setGuest();
    }
  };

  return (
    <div>
      <span>{friend.name}/{friend.username}</span>
      <input
        type="checkbox"
        name={`${friend.id}check`}
        checked={isChecked}
        value={friend.id}
        onChange={(e) => handleCheck()}
      />
    </div>
  );
}

export default InviteeOption;