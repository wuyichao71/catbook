import { initializeSnakeBody, updateSnakeBody } from "./Snake-snake.utils.js";
import { initializeFood, updateFood } from "./Snake-food.utils.js";
import { getGridSize, overlap, setGridSize } from "./Snake-value.js";

let id = null;

let lastRenderTime = 0;
let gameOver = false;

let snakeBody = [];
let setSnakeBody = null;
let food = {};
let setFood = null;

let setStage = null;

let blockSize = 0;
let canvas = null;
let rectMargin = 1;
const SNAKE_SPEED = 5;

export const setId = (value) => {
  id = value;
};
export const getId = () => {
  return id;
};
export const setSetStage = (callback) => {
  setStage = callback;
};
export const setSetSnakeBody = (callback) => {
  setSnakeBody = callback;
};
export const setSetFood = (callback) => {
  setFood = callback;
};

export const setSnakeBodyToGame = (value) => {
  snakeBody = value;
};
export const setFoodToGame = (value) => {
  food = value;
};
export const resetGameOver = () => {
  gameOver = false;
};

export default function main(currentTime) {
  if (gameOver) return;

  window.requestAnimationFrame(main);

  const secondSinceRender = (currentTime - lastRenderTime) / 1000;
  if (secondSinceRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  let nextFood;
  let nextSnakeBody;

  nextSnakeBody = updateSnakeBody(snakeBody);

  gameOver = isGameOver(nextSnakeBody);
  if (gameOver) {
    setStage("end");
    return;
  }
  const updated = updateFood(food, nextSnakeBody);
  nextFood = updated.food;
  nextSnakeBody = updated.snakeBody;

  setSnakeBody(nextSnakeBody);
  setFood(nextFood);
}

export function canvasMain(currentTime) {
  if (gameOver) return;

  window.requestAnimationFrame(canvasMain);

  const secondSinceRender = (currentTime - lastRenderTime) / 1000;
  if (secondSinceRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  let nextFood;
  let nextSnakeBody;

  nextSnakeBody = updateSnakeBody(snakeBody);

  gameOver = isGameOver(nextSnakeBody);
  if (gameOver) {
    setStage("end");
    return;
  }
  const updated = updateFood(food, nextSnakeBody);
  food = updated.food;
  snakeBody = updated.snakeBody;

  drawCanvas();
}

export const initializeGameOver = () => {
  gameOver = false;
  return gameOver;
};

const isGameOver = (snakeBody) => {
  return outOfBound(snakeBody[0]) || overlap(snakeBody[0], snakeBody.slice(1));
};

const outOfBound = (snakeHead) => {
  return (
    snakeHead.x < 1 || snakeHead.y < 1 || snakeHead.x > getGridSize() || snakeHead.y > getGridSize()
  );
};

export const initGame = (size) => {
  initializeGameOver();
  snakeBody = initializeSnakeBody();
  food = initializeFood();
  blockSize = canvas.width / size;
  drawCanvas();
  // console.log(snakeBody[0]);
};

const drawCanvas = () => {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (const pos of snakeBody) {
    drawRect(pos, "green");
  }

  drawCircle(food, "red");
};

const drawRect = (pos, color) => {
  const context = canvas.getContext("2d");
  // context.fillStyle = "white";
  // context.fillRect((pos.x - 1) * blockSize, (pos.y - 1) * blockSize, blockSize, blockSize);
  context.fillStyle = color;
  context.fillRect(
    (pos.x - 1) * blockSize + rectMargin,
    (pos.y - 1) * blockSize + rectMargin,
    blockSize - rectMargin * 2,
    blockSize - rectMargin * 2
  );
};

const drawCircle = (pos, color) => {
  const context = canvas.getContext("2d");
  context.beginPath();
  context.arc(
    (pos.x - 0.5) * blockSize,
    (pos.y - 0.5) * blockSize,
    blockSize / 2,
    0,
    2 * Math.PI,
    false
  );
  context.fillStyle = color;
  context.fill();
};

export const setCanvas = (value) => {
  canvas = value;
};
