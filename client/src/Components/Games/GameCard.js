import React from "react";

function GameCard({ game }) {
  
  return (
    <div className="card">
      <p>{game.title}</p>
    </div>
  );
}

export default GameCard;