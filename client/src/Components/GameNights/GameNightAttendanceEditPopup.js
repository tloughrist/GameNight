import './GameNights.css';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function AttendanceEditPopup({ attendance, setCertainty, attendingNights, setAttendingNights }){

  const [certaintyHolder, setCertaintyHolder] = useState("");

  async function handleEditAttendance(e) {
    e.preventDefault();
    const res = await fetch(`/attendances/${attendance.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          certainty: certaintyHolder
            }),
        });
    if (res.ok) {
      setCertainty(certaintyHolder);
    } else {
      alert(res.errors);
    }
  };

  async function handleDelete() {
    console.log(attendance)
    if (window.confirm("Are you sure you want to withdraw from this game night?")) {
      await fetch(`/unattend/${attendance.attendee_id}/${attendance.night.id}`, {
        method: "DELETE"
      });
      const attendingNightsSans = attendingNights.filter((attendNight) => attendNight.id !== attendance.night.id);
      setAttendingNights(attendingNightsSans);
    }
  };

  return( 
    <Popup trigger={<button>Edit Attendance</button>} position="right center">
      <form onSubmit={handleEditAttendance}>
        <label htmlFor="certainty">
            Certainty
        </label>
        <input
            type="text"
            name="certainty"
            autoComplete="certainty"
            value={certaintyHolder}
            onChange={(e) => setCertaintyHolder(e.target.value)}
        />
        <button type="submit">Change Certainty</button>
      </form>
      <button onClick={e => handleDelete()}>Regretfully Withdraw</button>
    </Popup>
  );
};

export default AttendanceEditPopup;