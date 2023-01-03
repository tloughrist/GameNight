import React from "react";
import { useHistory } from "react-router-dom";

function GameNights({isLoaded, isLoggedIn, currentUser, friends, gameNights, games}) {

    let history = useHistory();

    if (!isLoggedIn) {
        history.push("/home");
    }

    return (
        <div className="display-container">
            <p>Game Nights</p>
        </div>

    );
};

export default GameNights;