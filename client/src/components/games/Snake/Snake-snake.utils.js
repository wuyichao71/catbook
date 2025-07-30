import { getInputDirection } from "./Snake-input.js";
import { getGridSize } from "./Snake-value.js";

export const initializeSnakeBody = () => {
  return [
    { x: Math.ceil(getGridSize() / 2), y: Math.ceil(getGridSize() / 2) },
    { x: Math.ceil(getGridSize() / 2), y: Math.ceil(getGridSize() / 2) - 1 },
    { x: Math.ceil(getGridSize() / 2), y: Math.ceil(getGridSize() / 2) - 2 },
  ];
};

export const updateSnakeBody = (snakeBody) => {
  const newSnakeBody = [];
  const snakeDirection = getInputDirection();
  newSnakeBody.push({
    x: snakeBody[0].x + snakeDirection.x,
    y: snakeBody[0].y + snakeDirection.y,
  });
  for (let i = 0; i < snakeBody.length - 1; i++) {
    newSnakeBody.push(snakeBody[i]);
  }
  return newSnakeBody;
};
