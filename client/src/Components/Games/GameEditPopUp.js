import React, {useState, useContext} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { GamesContext } from "../../App.js";

function GameEditPopup({ game, setGames }){

  const [title, setTitle] = useState(game.game.title);
  const [numberPlayers, setNumberPlayers] = useState(game.game.no_players);
  const [duration, setDuration] = useState(game.game.duration_minutes);
  const [complexity, setComplexity] = useState(game.game.complexity);
  
  const games = useContext(GamesContext);

  async function handleEditGame(e, gameId) {
    e.preventDefault();
    const res = await fetch(`/games/${gameId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            title: title,
            duration_minutes: duration,
            no_players: numberPlayers,
            complexity: complexity
            }),
        });
    if (res.ok) {
      const game = await res.json();
      const gamesSans = games.filter((game) => game.game.id !== gameId);
      setGames([...gamesSans, game]);
    } else {
      alert(res.errors);
    }
  };

  async function handleDelete(gameId) {
    if (window.confirm("Are you sure you want to delete this game? Other people might have it in their collections.")) {
      await fetch(`/games/${gameId}`, {
          method: "DELETE"
      });
      alert(`${game.game.title} has been deleted. RIP ${game.game.title}.`);
      const gamesSans = games.filter((game) => game.game.id !== gameId);
      setGames(gamesSans);
    }
  };

  return( 
      <Popup trigger={<button>Edit Game</button>} position="right center">
        <form onSubmit={(e) => handleEditGame(e, game.game.id)}>
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
              Complexity  
          </label>
          <input
              type="number"
              name="complexity"
              autoComplete="complexity"
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
          />
          <button type="submit">Submit</button>
          <button onClick={e => handleDelete(game.game.id)}>Delete Game</button>
        </form>
      </Popup>
  );
  
}

export default GameEditPopup;