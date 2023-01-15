import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import GameCard from "./GameCard.js";
import { LoggedInContext, CurrentUserContext, GamesContext } from "../../App.js";

function Games({ setGames, search }) {

    const [searchString, setSearchString] = useState("");
    const [searchedGames, setSearchedGames] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [title, setTitle] = useState("");
    const [numberPlayers, setNumberPlayers] = useState("");
    const [duration, setDuration] = useState("");
    const [complexity, setComplexity] = useState("");

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

    async function handleCreateGame(e) {
        e.preventDefault();
        const res = await fetch("/games", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                originator_id: currentUser.id,
                title: title,
                duration_minutes: duration,
                no_players: numberPlayers,
                complexity: complexity
             }),
          });
        if (res.ok) {
            const game = await res.json();
            setGames([...games, game]);
        } else {
            alert(res.errors)
        } 
    };

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
                                setGames={setGames}
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
                                            setGames={setGames}
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
                    <div>
                        <h3>Submit Game</h3>
                        <form onSubmit={handleCreateGame}>
                        <label htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            autoComplete="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="no_players">
                            Number of Players
                        </label>
                        <input
                            type="text"
                            name="no_players"
                            autoComplete="no_players"
                            value={numberPlayers}
                            onChange={(e) => setNumberPlayers(e.target.value)}
                        />
                        <label htmlFor="duration">
                            Typical Duration
                        </label>
                        <input
                            type="text"
                            name="duration"
                            autoComplete="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <label htmlFor="complexity">
                            Complexity - 1: Tic-Tac-Toe, 5: Old Wargames  
                        </label>
                        <input
                            type="number"
                            name="complexity"
                            autoComplete="complexity"
                            value={complexity}
                            onChange={(e) => setComplexity(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                        </form>
                    </div>
            </div>
        :   <div>
                {history.push("/home")}
            </div>
    );
};

export default Games;