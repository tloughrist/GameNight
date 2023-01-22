import './GameNights.css';
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GameNightCard from "./GNCard.js";
import InvitationCard from "./InviteCard.js";
import AttendanceCard from "./AttendCard.js"
import CreatePopup from "./CreateNightPU.js";
import { LoggedInContext, CurrentUserContext } from "../../App.js";

function GameNights({ gameNights }) {

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("2000-01-01");
    const [time, setTime] = useState("00:00");
    const [location, setLocation] = useState("");
    const [attendances, setAttendances] = useState([]);
    const [originatedNights, setOriginatedNights] = useState([]);
    const [attendingNights, setAttendingNights] = useState([]);
    const [invitedNights, setInvitedNights] = useState([]);

    const isLoggedIn = useContext(LoggedInContext);
    const currentUser = useContext(CurrentUserContext);

    let history = useHistory();

    useEffect(() => {
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
            fetchAttendances(currentUser.id);
        }
    }, [currentUser, isLoggedIn])

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
    }, [gameNights]);

    return (
        isLoggedIn !== false?
            <div className="display-container">
                <div>
                    <CreatePopup
                        title={title}
                        setTitle={setTitle}
                        date={date}
                        setDate={setDate}
                        time={time}
                        setTime={setTime}
                        location={location}
                        setLocation={setLocation}
                        originatedNights={originatedNights}
                        setOriginatedNights={setOriginatedNights}
                    />
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
                                        originatedNights={originatedNights}
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
                                        attendances={attendances}
                                        attendingNights={attendingNights}
                                        setAttendingNights={setAttendingNights}
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
                                        invitedNights={invitedNights}
                                        setInvitedNights={setInvitedNights}
                                        setAttendances={setAttendances}
                                        setAttendingNights={setAttendingNights}
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