import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function GameNightEditPopup({ night, nights, setGameNights }){
  
  const [title, setTitle] = useState(night.title);
  const [date, setDate] = useState(night.date);
  const [time, setTime] = useState(night.time);
  const [location, setLocation] = useState(night.location);

  async function handleEditGameNight(e, nightId) {
    e.preventDefault();
    const res = await fetch(`/game_nights/${nightId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            title: title,
            date: date,
            time: time,
            location: location
            }),
        });
    if (res.ok) {
      console.log("fire")
      const gameNight = await res.json();
      const gameNightsSans = nights.filter((night) => night.id !== nightId);
      setGameNights([...gameNightsSans, gameNight]);
    } else {
      alert(res.errors);
    }
  };

  async function handleDelete(nightId) {
    if (window.confirm("Are you sure you want to cancel this game night?")) {
      await fetch(`/game_nights/${nightId}`, {
        method: "DELETE"
      });
    const nightsSans = nights.filter((night) => night.id !== nightId);
    setGameNights(nightsSans);
    }
  };

  return( 
    <Popup trigger={<button>Edit Game</button>} position="right center">
      <form onSubmit={(e) => handleEditGameNight(e, night.id)}>
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
            Location  
        </label>
        <input
            type="text"
            name="location"
            autoComplete="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={e => handleDelete(night.id)}>Cancel Game Night</button>
    </Popup>
  );
};

export default GameNightEditPopup;