import React from "react";

function GameOption({ game, gamesToBring, setGamesToBring }) {

  function handleGameSelect(gameSelect){
    const gameMatch = gamesToBring.filter((gtb) => gtb.id === gameSelect.id);
    gameMatch.length > 0?
      setGamesToBring(gamesToBring.filter((gtb) => gtb.id !== gameSelect.id))
    : setGamesToBring([...gamesToBring, gameSelect])
  };

  return(
    <div>
      <label htmlFor={game.game.title}>{game.game.title}</label>
      <input
        type="checkbox"
        name={game.game.title}
        value={game.game}
        onChange={(e) => handleGameSelect(e.target.value)}
      />
    </div>
  );
};

export default GameOption;