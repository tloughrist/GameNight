import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import GameNightCard from "./GameNightCard.js";
import InvitationCard from "./GameNightInvitations.js"
import { LoggedInContext, CurrentUserContext, GamesContext, FriendsContext } from "../../App.js";

function GameNights({ gameNights, fetchGameNights }) {

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [invitations, setInvitations] = useState([]);

    const isLoggedIn = useContext(LoggedInContext);
    const currentUser = useContext(CurrentUserContext);
    const games = useContext(GamesContext);
    const friends = useContext(FriendsContext);

    let history = useHistory();

    async function handleCreateGameNight(e) {
        if (title.length > 1 && date.length > 4 && time.length > 4 && location.length > 2) {
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
              const night = await res.json();
              if (night.errors) {
                alert(night.errors)
              }
        } else {
            alert("Invalid - check entries")
        }
    }

    return (
        isLoggedIn !== false?
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
                    {
                        gameNights.length > 0? 
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
                            </div>
                        :   <div>
                                <h3>You've scheduled no game nights.</h3>
                            </div>
                    }
                </div>
                <div>
                    <h3>Invitations</h3>
                    {
                        invitations.length > 0? 
                            <div>
                                {invitations.map((invitation) =>
                                    <InvitationCard
                                        key={`invitation${invitations.id}`}
                                        invitation={invitation}
                                    />
                                )}
                            </div>
                        :   <div>
                                <h3>You have no invitations right now.</h3>
                            </div>
                    }
                </div>
            </div>
        :   <div>
                {history.push("/home")}
            </div>
    );
};

export default GameNights;