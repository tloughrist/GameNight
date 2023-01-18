import React from "react";

function AttendanceCard({ attendance, setInvitations, setAttendances }) {

  //console.log(attendance)
  return(
    <div className="card">
      <h3>{attendance.night.title}</h3>
      <p><b>Date: </b>{attendance.night.date}</p>
      <p><b>Time: </b>{attendance.night.time}</p>
      <p><b>Location: </b>{attendance.night.location}</p>
      <p><b>Host: </b>{attendance.originatoryoriginator.name}/{attendance.originator.username}</p>
    </div>
  );
}

//      <button onClick={e => handleDelete(attendee.id, night.id)}>Uninvite</button>


export default AttendanceCard;