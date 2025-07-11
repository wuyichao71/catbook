const MAP_LENGTH = 500;
const INITIAL_RADIUS = 20;
const colors = ["red", "blue", "green", "yellow", "purple", "orange", "silver"]; // colors to use for players

// type state = {
//   players: {[id:string]: any},
// };

/** Helper to generate a random integer */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const getRandomPosition = () => {
  return {
    x: getRandomInt(0, MAP_LENGTH),
    y: getRandomInt(0, MAP_LENGTH),
  };
};

const gameState = {
  players: {},
};

const spawnPlayer = (id) => {
  gameState.players[id] = {
    position: getRandomPosition(),
    radius: INITIAL_RADIUS,
    color: "red",
  };
};

const updateGameState = () => {
  for (const key in gameState.players) {
    gameState.players[key].position = getRandomPosition();
  }
};

const removePlayer = (id) => {
  if (gameState.players[id] !== undefined) {
    delete gameState.players[id];
  }
};

module.exports = {
  gameState,
  spawnPlayer,
  updateGameState,

  removePlayer,
};
