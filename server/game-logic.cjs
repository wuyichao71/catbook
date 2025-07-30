const MAP_LENGTH = 500;
const INITIAL_RADIUS = 20;
const MAX_PLAYER_SIZE = 200;
const FOOD_SIZE = 2;
const EDIBLE_RANGE_RATIO = 0.9;
const EDIBLE_SIZE_RATIO = 0.9;
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

let playersEaten = [];

const playerAttemptEatPlayer = (pid1, pid2) => {
  const player1Position = gameState.players[pid1].position;
  const player2Position = gameState.players[pid2].position;
  const x1 = player1Position.x;
  const y1 = player1Position.y;
  const x2 = player2Position.x;
  const y2 = player2Position.y;
  const dist = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  if (dist < gameState.players[pid1].radius * EDIBLE_RANGE_RATIO) {
    if (gameState.players[pid1].radius * EDIBLE_SIZE_RATIO > gameState.players[pid2].radius) {
      gameState.players[pid1].radius += gameState.players[pid2].radius;
      playersEaten.push(pid2);
    }
  }
};

const computePlayersEatPlayers = () => {
  // console.log(Object.keys(gameState.players).length);
  if (Object.keys(gameState.players).length >= 2) {
    Object.keys(gameState.players).forEach((pid1) => {
      Object.keys(gameState.players).forEach((pid2) => {
        playerAttemptEatPlayer(pid1, pid2);
      });
    });
  }

  playersEaten.forEach((playerid) => {
    removePlayer(playerid);
  });

  playersEaten = [];
};

const playerAttemptEatFood = (pid1, f) => {
  const player1Position = gameState.players[pid1].position;
  const foodPosition = f.position;
  const x1 = player1Position.x;
  const y1 = player1Position.y;
  const x2 = foodPosition.x;
  const y2 = foodPosition.y;
  const dist = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  if (dist < gameState.players[pid1].radius - FOOD_SIZE) {
    if (gameState.players[pid1].radius > FOOD_SIZE) {
      gameState.players[pid1].radius += FOOD_SIZE;
      removeFood(f);
    }
  }
};

const computePlayersEatFoods = () => {
  for (const pid1 in gameState.players) {
    for (const f of gameState.food) {
      playerAttemptEatFood(pid1, f);
    }
  }
};

const gameState = {
  winner: null,
  players: {},
  food: [],
};

const spawnPlayer = (id) => {
  gameState.players[id] = {
    position: getRandomPosition(),
    radius: INITIAL_RADIUS,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
};

const spawnFood = () => {
  gameState.food.push({
    position: getRandomPosition(),
    radius: FOOD_SIZE,
    color: colors[Math.floor(Math.random() * colors.length)],
  });
};

const movePlayer = (id, dir) => {
  if (gameState.players[id] == undefined) {
    return;
  }

  const desiredPosition = { ...gameState.players[id].position };

  if ("up" === dir) {
    desiredPosition.y += 10;
  } else if ("down" === dir) {
    desiredPosition.y -= 10;
  } else if ("left" === dir) {
    desiredPosition.x -= 10;
  } else if ("right" === dir) {
    desiredPosition.x += 10;
  }

  if (desiredPosition.x > MAP_LENGTH) {
    desiredPosition.x = MAP_LENGTH;
  }
  if (desiredPosition.x < 0) {
    desiredPosition.x = 0;
  }
  if (desiredPosition.y > MAP_LENGTH) {
    desiredPosition.y = MAP_LENGTH;
  }
  if (desiredPosition.y < 0) {
    desiredPosition.y = 0;
  }

  gameState.players[id].position = desiredPosition;
};

const checkEnoughFoods = () => {
  if (gameState.food.length < 10) {
    spawnFood();
  }
};

const checkWin = () => {
  // console.log("checkWin begin: ", gameState.winner, gameState.players);
  const winners = Object.keys(gameState.players).filter((key) => {
    const player = gameState.players[key];
    if (player.radius > MAX_PLAYER_SIZE) {
      return true;
    }
  });

  // console.log("checkWin middle: ", gameState.winner, gameState.players);
  // console.log(winners);

  if (winners.length === 1) {
    gameState.winner = winners[0];
    Object.keys(gameState.players).forEach((key) => {
      removePlayer(key);
    });
  }
  // console.log("checkWin end: ", gameState.winner, gameState.players);
};

const updateGameState = () => {
  // console.log("-----------------");
  // console.log("update begin: ", gameState.winner, gameState.players);
  checkWin();
  computePlayersEatPlayers();
  computePlayersEatFoods();
  checkEnoughFoods();
  // console.log("update end: ", gameState.winner, gameState.players);
};

const removePlayer = (id) => {
  if (gameState.players[id] !== undefined) {
    delete gameState.players[id];
  }
};

const removeFood = (f) => {
  let ix = gameState.food.indexOf(f);
  if (-1 !== ix) {
    gameState.food.splice(ix, 1);
  }
};

module.exports = {
  gameState,
  spawnPlayer,
  updateGameState,
  movePlayer,
  removePlayer,
};
