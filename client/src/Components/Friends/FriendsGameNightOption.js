import React from "react";

function GameNightOption({ night }) {

  return (
    <option value={night.id}>{night.name}/{night.date}</option>
  );
}

export default GameNightOption;