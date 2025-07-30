import { useEffect, useState } from "react";
import { setFoodToGame, setSetFood } from "./Snake-game.js";
import { initializeFood } from "./Snake-food.utils.js";

import "../Snake.css";

export default function Food() {
  const [food, setFood] = useState(initializeFood());

  useEffect(() => {
    setSetFood(setFood);
    setFood(initializeFood());
    return () => {
      setSetFood(null);
    };
  }, []);

  setFoodToGame(food);
  return (
    <div
      style={{
        gridColumnStart: food.x,
        gridRowStart: food.y,
      }}
      className="Snake-food"
    ></div>
  );
}
