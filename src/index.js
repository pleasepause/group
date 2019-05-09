import React from "react";
import { render } from "react-dom";
import Pacman from "./PacmanGame";


const props = {
  gridSize: 20,
  animate: process.env.NODE_ENV !== "development"
};

function renderApp(PacmanApp = Pacman) {
  render(<PacmanApp {...props} />, document.getElementById("root"));
}

renderApp();

if (module.hot) {
  module.hot.accept("./PacmanGame", () =>
    renderApp(require("./PacmanGame").default)
  );
}
