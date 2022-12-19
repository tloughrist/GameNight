import React from "react";

function Friends({
    isLoaded={isLoaded},
    isLoggedIn={isLoggedIn},
    currentUser={currentUser},
    friends={friends},
    gameNights={gameNights}
}) {
    
    return (
        <div className="display-container">
            <p>Friends</p>
        </div>

    );
};

export default Friends;