import React from "react";
import React, { useState, useEffect } from "react";

function GameNights({
    isLoaded={isLoaded}
    isLoggedIn={isLoggedIn}
    currentUser={currentUser}
    friends={friends}
    gameNights={gameNights}
    games={games}
}) {

    return (
        <div className="display-container">
            <p>Game Nights</p>
        </div>

    );
};

export default GameNights;