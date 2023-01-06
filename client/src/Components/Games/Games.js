import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GameCard from "./GameCard.js";

let gameDisplay = <h3>Loading...</h3>
let searchedGameDisplay = <></>

function Games({isLoggedIn, currentUser, games, setGames, search}) {

    const [isInitialRender, setIsInitialRender] = useState(true);
    const [gamesDisplaySwitch, setGamesDisplaySwitch] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [searchedGames, setSearchedGames] = useState([]);

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
            gameDisplay = 
                <div>
                    <h3>Your Games</h3>
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

    //Once games load create message component for each message
    useEffect(() => {
        if (!isInitialRender) {
            if (searchedGames.length > 0) {
                searchedGameDisplay = 
                    <div>
                        {searchedGames.map((game) =>
                            <GameCard
                                key={`game${game.id}`}
                                game={game}
                            />
                        )}
                    </div>;
                setGamesDisplaySwitch(!gamesDisplaySwitch);
            } else {
                searchedGameDisplay = 
                    <div>
                        <h3>No games match criteria.</h3>
                    </div>;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchedGames]);

    async function gameSearch(string) {
        const response = await fetch("game/search?" + new URLSearchParams({ query: string }).toString());
        if (response.ok) {
          const gmes = await response.json();
          setSearchedGames(gmes);
          console.log(gmes);
        }
      };

    return (
        <div className="display-container">
            {gameDisplay}
            <div>
                <h3>Find Games</h3>
                <input
                    type="text"
                    placeholder="Search by title.."
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />
                <button onClick={(e) => gameSearch(searchString)} className="navlink">Search for Games</button>
                <div>
                    {searchedGameDisplay}
                </div>
            </div>
        </div>
    );
};

export default Games;