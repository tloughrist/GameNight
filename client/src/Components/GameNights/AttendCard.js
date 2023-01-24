import './GameNights.css';
import React, {useState, useEffect} from "react";
import AttendanceEditPopup from "./AttendEditPU.js";
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
      <p><b>when:</b> {moment(night.date, "YYYY:MM:DD").format("MM/DD/YYYY")} at {moment(night.time, "hh:mm").format("hh:mm a")}</p>
      <p><b>where: </b>{night.location}</p>
      <p><b>host: </b>{night.originator.name}/{night.originator.username}</p>
      <p><b>your degree of certainty: </b>{certainty}</p>
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