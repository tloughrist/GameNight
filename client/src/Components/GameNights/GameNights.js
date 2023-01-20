import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GameNightCard from "./GameNightCard.js";
import InvitationCard from "./GameNightInvitationCard.js";
import AttendanceCard from "./GameNightAttendanceCard.js"
import { LoggedInContext, CurrentUserContext, GamesContext, FriendsContext } from "../../App.js";

function GameNights({ gameNights, setGameNights }) {

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("2000-01-01");
    const [time, setTime] = useState("00:00");
    const [location, setLocation] = useState("");
    const [invitations, setInvitations] = useState([]);
    const [attendances, setAttendances] = useState([]);
    const [originatedNights, setOriginatedNights] = useState([]);
    const [attendingNights, setAttendingNights] = useState([]);
    const [invitedNights, setInvitedNights] = useState([]);

    const isLoggedIn = useContext(LoggedInContext);
    const currentUser = useContext(CurrentUserContext);
    const games = useContext(GamesContext);
    const friends = useContext(FriendsContext);

    let history = useHistory();

    useEffect(() => {
        async function fetchInvitations(userId) {
            const res = await fetch(`invitations/${userId}`);
            if (res.ok) {
                const invites = await res.json();
                setInvitations(invites);
            } else {
                alert(res.errors);
            }
        };
        async function fetchAttendances(userId) {
            const res = await fetch(`attendances/${userId}`);
            if (res.ok) {
                const attends = await res.json();
                setAttendances(attends);
            } else {
                alert(res.errors);
            }
        };
        if(currentUser){
            fetchInvitations(currentUser.id);
            fetchAttendances(currentUser.id);
        }
    }, [currentUser])

    useEffect(() => {
        function originNights(nights) {
            const originated = nights.filter((night) => night.role === "originator");
            return originated;
        };
        function attendNights(nights) {
            const attending = nights.filter((night) => night.role === "attendee");
            return attending;
        };
        function inviteNights(nights) {
            const invited = nights.filter((night) => night.role === "invitee");
            return invited;
        };
        if (gameNights.length > 0) {
            setOriginatedNights(originNights(gameNights));
            setAttendingNights(attendNights(gameNights));
            setInvitedNights(inviteNights(gameNights));
        }
    }, [gameNights])

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
            console.log(night)
            setGameNights([...gameNights, night]);
            setTitle("");
            setDate("2000-01-01");
            setTime("00:00");
            setLocation("");
        } else {
            alert(res.errors)
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
                        originatedNights.length > 0? 
                            <div>
                                {originatedNights.map((night) =>
                                    <GameNightCard
                                        key={`night${night.id}`}
                                        night={night}
                                        nights={originatedNights}
                                        setOriginatedNights={setOriginatedNights}
                                    />
                                )}
                            </div>
                        :   <div>
                                <h3>You've scheduled no game nights.</h3>
                            </div>
                    }
                </div>
                <div>
                    <h3>Game Nights You're Attending</h3>
                    {
                        attendingNights.length > 0? 
                            <div>
                                {attendingNights.map((night) =>
                                    <AttendanceCard
                                        key={`attendance${night.id}`}
                                        night={night}
                                    />
                                )}
                            </div>
                        :   <div>
                                <h3>You're not attending anyone else's game nights.</h3>
                            </div>
                    }
                </div>
                <div>
                    <h3>Invitations</h3>
                    {
                        invitedNights.length > 0? 
                            <div>
                                {invitedNights.map((night) =>
                                    <InvitationCard
                                        key={`invitation${night.id}`}
                                        night={night}
                                        setInvitations={setInvitations}
                                        setAttendances={setAttendances}
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