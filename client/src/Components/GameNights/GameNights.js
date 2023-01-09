import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useToggle } from "../../CustomHooks/Toggle.js";
import GameNightCard from "./GameNightCard.js";

let gameNightsDisplay = <h3>Loading...</h3>

function GameNights({isLoggedIn, currentUser, friends, gameNights, fetchGameNights, games}) {

    const [isInitialRender, setIsInitialRender] = useState(true);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [isToggled, toggle] = useToggle(false);

    let history = useHistory();

    //Allow only logged-in users access
    useEffect(() => {
        if (!isInitialRender) {
            if (!isLoggedIn) {
                history.push("/home");
            }
        } else {
            setIsInitialRender(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    //Once game nights load create message component for each message
    useEffect(() => {
        if (gameNights.length > 0) {
            gameNightsDisplay = 
                <div>
                    {gameNights.map((night) =>
                        <GameNightCard
                            key={`night${night.id}`}
                            night={night}
                            fetchGameNights={fetchGameNights}
                            friends={friends}
                            currentUser={currentUser}
                        />
                    )}
                </div>;
        } else {
            gameNightsDisplay = 
                <div>
                    <h3>You've scheduled no game nights.</h3>
                </div>;
        }
        //This forces a rerender...which is useful.
        toggle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameNights]);

    async function handleCreateGameNight(e) {
        if (title.length > 1 && date.length > 4 && time.length > 4 && location.length > 2) {
            const res = await fetch("/game_nights", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name: title,
                    date: date,
                    time: time,
                    owner_id: currentUser.id,
                    location: location
                 }),
              });
              const night = await res.json();
              if (night.errors) {
                alert(night.errors)
              }
        } else {
            alert("Invalid - check entries")
        }
    }

    return (
        <div className="display-container">
            <div>
                <h3>Schedule a Game Night</h3>
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
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <h3>Your Game Nights</h3>
                {gameNightsDisplay}
            </div>
        </div>
    );
};

export default GameNights;