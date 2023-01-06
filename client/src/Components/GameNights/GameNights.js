import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import GameNightCard from "./GameNightCard.js";

let gameNightsDisplay = <h3>Loading...</h3>

function GameNights({userLoaded, isLoggedIn, currentUser, friends, gameNights, games}) {

    const [isInitialRender, setIsInitialRender] = useState(true);
    const [gameNightsDisplaySwitch, setGameNightsDisplaySwitch] = useState(false);

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
                    <h3>Your Game Nights</h3>
                    {gameNights.map((night) =>
                        <GameNightCard
                            key={`night${night.id}`}
                            night={night}
                        />
                    )}
                </div>;
            setGameNightsDisplaySwitch(!gameNightsDisplaySwitch);
        } else {
            gameNightsDisplay = 
                <div>
                    <h3>You've scheduled no game nights.</h3>
                </div>;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameNights]);

    return (
        <div className="display-container">
            {gameNightsDisplay}
        </div>
    );
};

export default GameNights;