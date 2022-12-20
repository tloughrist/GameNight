import React from "react";

function Profile({isLoaded, isLoggedIn, currentUser, logout}) {
    return (
        <div className="display-container">
            <p>Profile</p>
            <button onClick={e => logout} className="navlink">Logout</button>
        </div>
    );
};

export default Profile;