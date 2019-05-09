import React from "react";
import { WALL_COLOUR, WIDTH, HEIGHT } from "../../constants";
import Line from "../gridline";
import walls from "./walls";
import "../../style.scss";

export function Walls(props) {
  const lineProps = {
    strokeWidth: 1,
    stroke: WALL_COLOUR,
    fill: "none"
  };

  const linesWalls = Object.keys(walls).map(key => {
    const parts = walls[key].parts.map(([distance, direction, radius]) => ({
      distance,
      direction,
      radius
    }));

    return (
      <Line
        key={key}
        {...props}
        {...lineProps}
        start={walls[key].start}
        parts={parts}
      />
    );
  });

  return <g className="walls">{linesWalls}</g>;
}

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

