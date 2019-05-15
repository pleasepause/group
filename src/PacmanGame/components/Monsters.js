import React, { Component } from "react";
import { cssPosition } from "../constants";
import "../style.scss";

function MonsterEye({ radius, offset, direction }) {
  const eyeballCenterX = radius * (1 + 0.4 * offset);
  const eyeballCenterY = radius * 0.7;
  const eyeballRadius = radius * 0.3;

  const reverse = (-1) ** ((direction < 2) >> 0);
  const vertical = direction % 2;
  const horizontal = 1 - vertical;

  const irisOffsetX = -horizontal * reverse;
  const irisOffsetY = vertical * reverse;

  const outerProps = {
    cx: eyeballCenterX,
    cy: eyeballCenterY,
    r: eyeballRadius,
    fill: "white"
  };

  const irisProps = {
    cx: eyeballCenterX + (eyeballRadius / 2) * irisOffsetX,
    cy: eyeballCenterY + (eyeballRadius / 2) * irisOffsetY,
    r: eyeballRadius / 2,
    fill: "black"
  };

  return (
    <g className="eye">
      <circle {...outerProps} />
      <circle {...irisProps} />
    </g>
  );
}

function getMonsterPath(radius) {
  const width = radius * 2;
  const height = radius * 2;
  const radiusSmall = radius / 5;

  return [
    `M${radius},0`,
    `A${radius},${radius} 0 0 1 ${width},${radius}`,
    `L${width},${height - radiusSmall}`,
    `A${radiusSmall},${radiusSmall} 0 0 1 ${width - radiusSmall * 2},${height -
      radiusSmall}`,
    `A${radiusSmall},${radiusSmall} 0 0 0 ${width - radiusSmall * 4},${height -
      radiusSmall}`,
    `A${radiusSmall},${radiusSmall} 0 0 1 ${width - radiusSmall * 6},${height -
      radiusSmall}`,
    `A${radiusSmall},${radiusSmall} 0 0 0 ${width - radiusSmall * 8},${height -
      radiusSmall}`,
    `A${radiusSmall},${radiusSmall} 0 0 1 ${width - radiusSmall * 10},${height -
      radiusSmall}`,
    `L0,${height - radiusSmall}`,
    `L0,${radius}`,
    `A${radius},${radius} 0 0 1 ${radius},0`
  ].join(" ");
}

function WaveMouth({ gridSize, eating }) {
  if (!eating) {
    return null;
  }

  const waveRadius = gridSize * 0.125;
  const yPos = gridSize * 0.95;

  const mouthPath = [
    `M${waveRadius * 2},${yPos}`,
    `A${waveRadius},${waveRadius * 5} 0 0 1 ${3 * waveRadius},${yPos}`,
    `A${waveRadius},${waveRadius * 5} 0 0 0 ${4 * waveRadius},${yPos}`,
    `A${waveRadius},${waveRadius * 5} 0 0 1 ${5 * waveRadius},${yPos}`,
    `A${waveRadius},${waveRadius * 5} 0 0 0 ${6 * waveRadius},${yPos}`,
    `A${waveRadius},${waveRadius * 5} 0 0 1 ${7 * waveRadius},${yPos}`,
    `A${waveRadius},${waveRadius * 5} 0 0 0 ${8 * waveRadius},${yPos}`,
    `A${waveRadius},${waveRadius * 5} 0 0 1 ${9 * waveRadius},${yPos}`,
    `A${waveRadius},${waveRadius * 5} 0 0 0 ${10 * waveRadius},${yPos}`
  ].join(" ");

  return <path d={mouthPath} stroke="white" strokeWidth={1} />;
}

function getColor(eating, eatingFlash, color) {
  if (eating) {
    if (eatingFlash) {
      return "#c9a";
    }

    return "#06c";
  }

  return color;
}

function getPlayerControl(playerControl) {
  if (playerControl === true) {
    return "#FFF";
  }
  return "none";
}

function MonsterIcon({
  gridSize,
  eating,
  eatingFlash,
  position,
  direction,
  color,
  playerControl
}) {
  const radius = gridSize * 0.75;
  const monsterPath = getMonsterPath(radius);
  const pathProps = {
    stroke: getPlayerControl(playerControl),
    fill: getColor(eating, eatingFlash, color)
  };

  const style = {
    ...cssPosition(position, gridSize),
    width: radius * 2,
    height: radius * 2,
    marginLeft: -radius,
    marginTop: -radius
  };

  return (
    <svg className="pacman-monster" style={style}>
      <path d={monsterPath} {...pathProps} />
      <WaveMouth gridSize={gridSize} eating={eating} />
      <MonsterEye radius={radius} direction={direction} offset={-1} />
      <MonsterEye radius={radius} direction={direction} offset={1} />
    </svg>
  );
}

export default class Monster extends Component {
  constructor(props) {
    super(props);

    this.getPlayerControl = this.getPlayerControl.bind(this);
    this.state = {
      eatingFlash: 0,
      timerFlash: this.getTimerFlash(),
      playerControl: null
    };
    this.onKey = evt => {
      if (evt.key === "1") {
        this.getPlayerControl();
      }

      return null;
    };
  }
  getTimerFlash() {
    if (this.state) {
      clearInterval(this.state.timerFlash);
    }

    if (!this.props.eatingTime) {
      return null;
    }

    return setInterval(() => {
      this.setState({ eatingFlash: (this.state.eatingFlash + 1) % 2 });
    }, 500);
  }
  getPlayerControl() {
    if (this.props.playerControlled === true) {
      this.setState({ playerControl: true });
    }
  }
  componentDidMount() {
    // console.log(this.nuPosition);
    window.addEventListener("keydown", this.onKey);
  }
  componentDidUpdate(prevProps) {
    // console.log("props in monsterjs", this.props);
    // console.log("state", this.state);
    if (
      (this.props.eatingTime > 0 && prevProps.eatingTime === 0) ||
      (this.props.eatingTime === 0 && prevProps.eatingTime > 0)
    ) {
      this.setState({ timerFlash: this.getTimerFlash() });
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.timerFlash);
  }

  render() {
    if (this.props.deadTime > 0) {
      return null;
    }

    const { eatingTime, ...props } = this.props;
    const eating = eatingTime > 0;

    return <MonsterIcon eating={eating} {...props} {...this.state} />;
  }
}
