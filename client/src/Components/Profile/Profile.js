import React from "react";

function Profile({
    isLoaded={isLoaded},
    isLoggedIn={isLoggedIn},
    currentUser={currentUser}
}) {
    return (
        <div className="display-container">
            <p>Profile</p>
        </div>
    );
};

export default Profile;