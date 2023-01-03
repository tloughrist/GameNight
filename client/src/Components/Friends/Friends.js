import React from "react";
import { useHistory } from "react-router-dom";

function Friends({isLoaded, isLoggedIn, currentUser, friends, gameNights}) {
    
    let history = useHistory();

    if (!isLoggedIn) {
        history.push("/home");
    }

    return (
        <div className="display-container">
            <p>Friends</p>
        </div>

    );
};

export default Friends;