import React, { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { CurrentUserContext, GamesContext } from "../../App.js";
import GameOption from "./GameNightGameOption.js";

function GameNightAcceptPopup({ night, nights, setGameNights }){
  
  const [certainty, setCertainty] = useState("");
  const [gamesToBring, setGamesToBring] = useState([]);

  const currentUser = useContext(CurrentUserContext);
  const games = useContext(GamesContext);

  async function handleAcceptance(e, nightId) {
    e.preventDefault();
    const res = await fetch(`/attendances`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            
            }),
        });
    if (res.ok) {
      const gameNight = await res.json();
      const gameNightsSans = nights.filter((night) => night.id !== nightId);
      setGameNights([...gameNightsSans, gameNight]);
    } else {
      alert(res.errors);
    }
  };

  return( 
    <Popup trigger={<button>Accept Invitation</button>} position="right center">
      <form onSubmit={(e) => handleAcceptance(e, night.id)}>
        <label htmlFor="title">
            How Certain are You?
        </label>
        <input
            type="text"
            name="certainty"
            autoComplete="certainty"
            value={certainty}
            onChange={(e) => setCertainty(e.target.value)}
        />
        <div>
          {
            games.length > 0?
              games.map((game) =>
                <GameOption
                  key={`game${game.game.id}`}
                  game={game}
                  gamesToBring={gamesToBring}
                  setGamesToBring={setGamesToBring}
                />
              )
            : <p>Sorry, you have no games in your collection.</p>
          }
        </div>
        <button type="submit">Send Acceptance</button>
      </form>
    </Popup>
  );
};

export default GameNightAcceptPopup;