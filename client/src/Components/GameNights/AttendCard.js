import './GameNights.css';
import React, {useState, useEffect} from "react";
import AttendanceEditPopup from "./GameNightAttendanceEditPopup.js";
import moment from 'moment';

function AttendanceCard({ night, attendances, attendingNights, setAttendingNights }) {

  const attendance = attendances.find((attend) => attend.night.id === night.id);
  const [certainty, setCertainty] = useState();

  useEffect(() => {
    if (attendance) {
      setCertainty(attendance.certainty)
    }
  }, [attendances, attendance])

  return(
    <div className="card">
      <h3>{night.title}</h3>
      <p><b>When:</b> {moment(night.date, "YYYY:MM:DD").format("MM/DD/YYYY")} at {moment(night.time, "hh:mm").format("hh:mm a")}</p>
      <p><b>Location: </b>{night.location}</p>
      <p><b>Host: </b>{night.originator.name}/{night.originator.username}</p>
      <p><b>Your degree of certainty: </b>{certainty}</p>
      <AttendanceEditPopup 
        setCertainty={setCertainty}
        certainty={certainty}
        attendance={attendance}
        attendingNights={attendingNights}
        setAttendingNights={setAttendingNights}
      />
    </div>
  );
}

export default AttendanceCard;