import React from "react";
import { useHistory } from "react-router-dom";

function Games({isLoaded, isLoggedIn, currentUser, friends, games}) {

    let history = useHistory();

    if (!isLoggedIn) {
        history.push("/home");
    }

    return (
        <div className="display-container">
            <p>Games</p>
        </div>

    );
};

export default Games;