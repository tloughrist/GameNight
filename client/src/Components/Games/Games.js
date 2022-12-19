import React from "react";

function Games({
    isLoaded={isLoaded},
    isLoggedIn={isLoggedIn},
    currentUser={currentUser},
    friends={friends},
    games={games}
}) {

    return (
        <div className="display-container">
            <p>Games</p>
        </div>
        
    );
};

export default Games;