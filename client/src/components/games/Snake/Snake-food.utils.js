import { overlap } from "./Snake-value.js";
import { getGridSize } from "./Snake-value.js";

export const initializeFood = () => ({
  x: Math.ceil(getGridSize() / 2) - 7,
  y: Math.ceil(getGridSize() / 2) + 6,
});

export const updateFood = (food, snakeBody) => {
  if (overlap(food, snakeBody)) {
    const foodPos = [];
    for (let i = 1; i <= getGridSize(); i++) {
      for (let j = 1; j <= getGridSize(); j++) {
        if (!overlap({ x: i, y: j }, snakeBody)) {
          foodPos.push({ x: i, y: j });
        }
      }
    }
    const nextFood = foodPos[Math.floor(Math.random() * foodPos.length)];
    const nextSnakeBody = [...snakeBody, snakeBody[snakeBody.length - 1]];
    return { snakeBody: nextSnakeBody, food: nextFood };
  }
  return { snakeBody: snakeBody, food: food };
};
