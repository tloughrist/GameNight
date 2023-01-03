import React from "react";
import { useHistory } from "react-router-dom";

function Profile({isLoaded, isLoggedIn, currentUser, logout}) {
    
    let history = useHistory();

    if (!isLoggedIn) {
        history.push("/home");
    }

    async function handleLogout() {
        const res = await fetch("/logout", {
          method: "DELETE"
        });
        logout();
    };

    return (
        <div className="display-container">
            <p>Profile</p>
            <button onClick={e => handleLogout()} className="navlink">Logout</button>
        </div>
    );
};

export default Profile;