//See Messages.js for more information about the pattern here

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GameCard from "./GameCard.js";

let gameDisplay = <h3>Loading...</h3>

function Games({isLoggedIn, currentUser, games, setGames}) {

    const [isInitialRender, setIsInitialRender] = useState(true);
    const [gamesDisplaySwitch, setGamesDisplaySwitch] = useState(false);

    let history = useHistory();

    //Allow only logged-in users access
    useEffect(() => {
        if (!isInitialRender) {
            if (!isLoggedIn) {
                history.push("/home");
            }
        } else {
            setIsInitialRender(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    //Once games load create message component for each message
    useEffect(() => {
        if (games.length > 0) {
            console.log(games)
            gameDisplay = 
                <div>
                    <h3>My Games</h3>
                    {games.map((game) =>
                        <GameCard
                            key={`game${game.id}`}
                            game={game}
                        />
                    )}
                </div>;
            setGamesDisplaySwitch(!gamesDisplaySwitch);
        } else {
            gameDisplay = 
                <div>
                    <h3>No games in collection.</h3>
                </div>;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [games]);

    return (
        <div className="display-container">
            {gameDisplay}
        </div>
    );
};

export default Games;