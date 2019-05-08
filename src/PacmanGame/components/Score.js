import React from "react";
import "../style.scss";

export default function Scores({ score, lost }) {
  let gameOver = null;

  if (lost) {
    gameOver = <span className="game-over">{"Game over!"}</span>;
  }

  return (
    <div className="pacman-scores">
      <span className="running-score">
        {"Score: "}
        {score}
      </span>
      {gameOver}
    </div>
  );
}
