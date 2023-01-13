import React from "react";

function GameCard({ game, originatorGames }) {
  
  function handleEdit() {
    
  }

  function handleDisown() {

  }
  
  return (
    <div className="card">
      <p>{game.game.title}</p>
      {
        game.originator?
          <button onClick={(e) => handleEdit()}>Edit Game</button>
        : <></>
      }
      <button onClick={(e) => handleDisown()}>Disown Game</button>
    </div>
  );
}

export default GameCard;