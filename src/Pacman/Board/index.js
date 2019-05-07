import React from "react";
import PropTypes from "prop-types";
import { WIDTH, HEIGHT } from "../constants";
import Walls from "./Walls";
import "./style.scss";

export default function Board(props) {
  const { gridSize } = props;

  const boardWidth = gridSize * WIDTH;
  const boardHeight = gridSize * HEIGHT;

  return (
    <div className="pacman-board">
      <svg width={boardWidth} height={boardHeight}>
        <rect x={0} y={0} width={boardWidth} height={boardHeight} fill="#000" />
        <Walls {...props} />
      </svg>
    </div>
  );
}

Board.propTypes = {
  gridSize: PropTypes.number.isRequired
};
