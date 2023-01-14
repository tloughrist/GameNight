import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import GameCard from "./GameCard.js";   
import { LoggedInContext, CurrentUserContext, GamesContext } from "../../App.js";

function Games({ setGames, search }) {

    const [searchString, setSearchString] = useState("");
    const [searchedGames, setSearchedGames] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const isLoggedIn = useContext(LoggedInContext);
    const currentUser = useContext(CurrentUserContext);
    const games = useContext(GamesContext);

    let history = useHistory();

    async function gameSearch(id, string) {
        const response = await fetch(`games/${id}/search?` + new URLSearchParams({ query: string}).toString());
        if (response.ok) {
          const gmes = await response.json();
          setSearchedGames(gmes);
          setIsLoaded(true);
        }
    };

    console.log(games)
    return (
        isLoggedIn !== false?
            <div className="display-container">
                <h3>Your Games</h3>
                {games.length > 0?
                    <div>
                        {games.map((game) =>
                            <GameCard
                                key={`game${game.game.id}`}
                                game={game}
                            />
                        )}
                    </div>
                :   <div>
                        <h3>No games in collection.</h3>
                    </div>
                }
                <div>
                    <h3>Find Games</h3>
                    <input
                        type="text"
                        placeholder="Search by title.."
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                    <button onClick={(e) => gameSearch(currentUser.id, searchString)} className="navlink">Search for Games</button>
                    <div>
                        {isLoaded?
                            searchedGames.length > 0?
                                <div>
                                    {searchedGames.map((game) =>
                                        <GameCard
                                            key={`game${game.game.id}`}
                                            game={game}
                                        />
                                    )}
                                </div>
                            :   <div>
                                    <h3>No games in collection.</h3>
                                </div>
                        :   <></>
                        }
                    </div>
                </div>
            </div>
        :   <div>
                {history.push("/home")}
            </div>
    );
};

export default Games;