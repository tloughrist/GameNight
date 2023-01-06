import React from "react";

function GameNightCard({ night }) {

  return (
    <div className="card">
      <p>{night.date}</p>
      <p>{night.time}</p>
      <p>{night.location}</p>
    </div>
  );
}

export default GameNightCard;