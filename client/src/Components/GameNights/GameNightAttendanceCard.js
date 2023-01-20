import React from "react";

function AttendanceCard({ night, setInvitations, setAttendances }) {

  return(
    <div className="card">
      <h3>{night.title}</h3>
      <p><b>Date: </b>{night.date}</p>
      <p><b>Time: </b>{night.time}</p>
      <p><b>Location: </b>{night.location}</p>
      <p><b>Host: </b>{night.originator.name}/{night.originator.username}</p>
    </div>
  );
}

export default AttendanceCard;