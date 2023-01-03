import React from "react";
import { useHistory } from "react-router-dom";

function Profile({isLoaded, isLoggedIn, currentUser, logout}) {
    
    let history = useHistory();

    if (!isLoggedIn) {
        history.push("/home");
    }

    return (
        <div className="display-container">
            <p>Profile</p>
            <button onClick={e => logout} className="navlink">Logout</button>
        </div>
    );
};

export default Profile;