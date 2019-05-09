import React from "react";
import Food from "./Foods.js";
import "../style.scss";

export default function AllFood({ food, ...props }) {
  const items = food
    .filter(({ eaten }) => !eaten)
    .map(({ key, ...item }) => <Food key={key} {...item} {...props} />);

  return <div className="food-all">{items}</div>;
}

