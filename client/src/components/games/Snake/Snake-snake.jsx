import { useEffect, useState } from "react";
// import { getInputDirection } from "./Snake-input.js";
import { setSetSnakeBody, setSnakeBodyToGame } from "./Snake-game.js";
import { initializeSnakeBody } from "./Snake-snake.utils.js";

export default function SnakeBody() {
  const [snakeBody, setSnakeBody] = useState(initializeSnakeBody());
  const snakeBodyDiv = [];

  useEffect(() => {
    setSetSnakeBody(setSnakeBody);
    setSnakeBody(initializeSnakeBody());
    return () => {
      setSetSnakeBody(null);
    };
  }, []);

  setSnakeBodyToGame(snakeBody);
  for (let i = 0; i < snakeBody.length; i++) {
    snakeBodyDiv.push(
      <div
        key={i}
        style={{
          gridColumnStart: snakeBody[i].x,
          gridRowStart: snakeBody[i].y,
        }}
        className="Snake-snake"
      ></div>
    );
  }
  return snakeBodyDiv;
}
