import React, { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { CurrentUserContext, GamesContext } from "../../App.js";
import GameOption from "./GameNightGameOption.js";

function GameNightAcceptPopup({ night, nights, setGameNights, setAttendances }){
  
  const [certainty, setCertainty] = useState("");
  const [gamesToBring, setGamesToBring] = useState([]);

  const currentUser = useContext(CurrentUserContext);
  const games = useContext(GamesContext);

  async function handleAcceptance(e, nightId, attendeeId, certainLvl) {
    e.preventDefault();
    const attendRes = await fetch(`/attendances`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          game_night_id: nightId,
          attendee_id: attendeeId,
          certainty: certainLvl
            }),
        });
    if (attendRes.ok) {
      const attndncs = await attendRes.json();
      setAttendances(attndncs);
      if (gamesToBring.length > 0) {
        gamesToBring.map(async (game) => {
          const gameNightsRes = await fetch(`/game_night_games`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              game_night_id: nightId,
              attendee_id: attendeeId,
              game_id: game.id
            })
          })
          if (gameNightsRes.ok) {
            const ngts = await gameNightsRes.json();
            setAttendances(ngts);
          } else {
            alert(gameNightsRes.errors);
          }
        });
      }
    } else {
      alert(attendRes.errors);
    }
  };

  return( 
    <Popup trigger={<button>Accept Invitation</button>} position="right center">
      <form onSubmit={(e) => handleAcceptance(e, night.id, currentUser.id, certainty)}>
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