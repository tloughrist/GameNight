import React, { useContext } from "react";
import { CurrentUserContext, GamesContext } from "../../App.js";
import GameEditPopup from "./GameEditPopUp.js";

function GameCard({ game, setGames }) {
  
  const currentUser = useContext(CurrentUserContext);
  const games = useContext(GamesContext);

  async function handleDisown(userId, gameId) {
    await fetch(`/users/${userId}/games/${gameId}/user_games`, {
      method: "DELETE"
    });
    const gamesSans = games.filter((game) => game.game.id !== gameId);
    setGames(gamesSans);
  };

  async function handleAdd(userId, gameId) {
    const res = await fetch("/user_games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
          owner_id: userId,
          game_id: gameId,
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
    <div className="card">
      <p>{game.game.title}</p>
      <p>Typical Duration: {game.game.duration_minutes}</p>
      <p>Number of Players: {game.game.no_players}</p>
      <p>Complexity: {game.game.complexity} / 5</p>
      {
        game.originated?
          <GameEditPopup
            game={game}
            setGames={setGames}
          />
        : <></>
      }
      {
        game.owned?
          <button onClick={(e) => handleDisown(currentUser.id, game.game.id)}>Disown Game</button>
        : <button onClick={(e) => handleAdd(currentUser.id, game.game.id)}>Add Game to Collection</button>
      }
    </div>
  );
}

export default GameCard;