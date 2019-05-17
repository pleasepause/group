export const EAST = 0;
export const NORTH = 1;
export const WEST = 2;
export const SOUTH = 3;

export const mEAST = 4;
export const mNORTH = 5;
export const mWEST = 6;
export const mSOUTH = 7;

export const COMPASS = [EAST, NORTH, WEST, SOUTH];

export const WIDTH = 28;
export const HEIGHT = 36;

export function cssPosition(position, gridSize) {
  return {
    left: (position[0] + 1.5) * gridSize,
    top: (HEIGHT - position[1] - 3) * gridSize
  };
}

export const PLAYER_RADIUS = 0.8;

export const WALL_COLOUR = '#06f';

export const EATING_TIME_SECONDS = 5;

export const MONSTER_SPEED_ATTACK = 5;
export const MONSTER_SPEED_RETREAT = 3;
export const PLAYER_SPEED = MONSTER_SPEED_ATTACK;

export const MONSTER_DEATH_TIME_SECONDS = 3;
export const MONSTER_HOME_RANGE = [17, 18, 8, 12];
export const MONSTER_HOME_EXIT_COL = 12.5;
