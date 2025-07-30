import { useState, useEffect } from "react";
import { setSetStage } from "./Snake/Snake-game.js";
import { initializeInputDirection } from "./Snake/Snake-input.js";
import SnakeCanvas from "./Snake/SnakeCanvas.jsx";

import "./Snake.css";

export default function CanvasSnake() {
  const [stage, setStage] = useState("menu");
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const restartGame = () => {
    initializeInputDirection();
    setStage("menu");
  };

  const initialzeGame = () => {
    if (isNaN(parseInt(value))) return;
    setStage("game");
  };

  useEffect(() => {
    setSetStage(setStage);
  }, []);

  if (stage === "menu") {
    let msg = null;
    if (value !== "" && isNaN(parseInt(value))) {
      msg = <p style={{ color: "red", textAlign: "center" }}>Please input an integer!</p>;
    }
    return (
      <>
        <p className="Snake-menuPrompt">Please input grid size!</p>
        <div className="Snake-menu">
          <input className="Snake-input" onChange={handleChange} />
          <button className="Snake-button" onClick={initialzeGame}>
            Start!
          </button>
        </div>
        {msg}
      </>
    );
  }

  return (
    <>
      <SnakeCanvas gridSize={parseInt(value)} />
      {stage === "end" ? (
        <div className="Snake-finished">
          The Snake is dead!
          <button className="Snake-button Snake-restartButton" onClick={restartGame}>
            Restart!
          </button>
        </div>
      ) : null}
    </>
  );
}
