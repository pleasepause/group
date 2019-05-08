import React from "react";
import classNames from "classnames";
import { cssPosition } from "../constants";
import "../style.scss";

export default function Food({ gridSize, position, eaten, big }) {
  const className = classNames("food", { eaten, big });

  const style = cssPosition(position, gridSize);

  return <span className={className} style={style} />;
}
