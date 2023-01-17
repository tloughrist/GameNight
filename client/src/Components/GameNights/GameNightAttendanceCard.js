import React from "react";

function AttendanceCard({ attendance, setInvitations, setAttendances }) {

  console.log(attendance)
  return(
    <div>
      <p>{attendance.night.title}</p>
    </div>
  );
}

//      <button onClick={e => handleDelete(attendee.id, night.id)}>Uninvite</button>


export default AttendanceCard;