import './GameNights.css';
import React, { useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { CurrentUserContext } from "../../App.js";

function CreatePopup({ title, setTitle, date, setDate, time, setTime, location, setLocation, originatedNights, setOriginatedNights  }) {

  const currentUser = useContext(CurrentUserContext);

  async function handleCreateGameNight(e) {
    e.preventDefault();
    const res = await fetch("/game_nights", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            title: title,
            date: date,
            time: time,
            originator_id: currentUser.id,
            location: location
            }),
        });
    if (res.ok) {
        const night = await res.json();
        setOriginatedNights([...originatedNights, night]);
    } else {
        alert(res.errors)
    }
    setTitle("");
    setDate("2000-01-01");
    setTime("00:00");
    setLocation("");
  };

  return( 
    <Popup trigger={<button className="navlink card_button">Create Game Night</button>} position="bottom center">
      <form onSubmit={handleCreateGameNight}>
        <label htmlFor="title">
            Title
        </label>
        <input
            type="text"
            name="title"
            autoComplete="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="date">
            Date
        </label>
        <input
            type="date"
            name="date"
            autoComplete="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="time">
            Time
        </label>
        <input
            type="time"
            name="time"
            autoComplete="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
        />
        <label htmlFor="location">
            Location - this will be visible to all invitees
        </label>
        <input
            type="text"
            name="location"
            autoComplete="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
        />
        <button className="navlink card_button" type="submit">Submit</button>
      </form>
    </Popup>
  );
};

export default CreatePopup;