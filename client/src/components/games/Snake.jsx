import { useState, useEffect } from "react";
import main, { getId, resetGameOver, setId, setSetStage } from "./Snake/Snake-game.js";
import SnakeBody from "./Snake/Snake-snake";
import Food from "./Snake/Snake-food";
// import { renderSnake, renderFood } from "./Snake/Snake-render.jsx";
import { getGridSize, setGridSize } from "./Snake/Snake-value.js";
import "./Snake.css";
import { initializeInputDirection } from "./Snake/Snake-input.js";

const Snake = () => {
  const [stage, setStage] = useState("menu");
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const startGame = () => {
    const gridSize = parseInt(value);
    if (isNaN(gridSize)) return;
    setGridSize(gridSize);
    resetGameOver();
    setId(window.requestAnimationFrame(main));
    setStage("game");
  };

  const restartGame = () => {
    initializeInputDirection();
    setStage("menu");
  };

  useEffect(() => {
    setSetStage(setStage);
    // setId(window.requestAnimationFrame(main));

    return () => {
      setSetStage(null);
      if (getId()) {
        window.cancelAnimationFrame(getId());
        setId(null);
      }
    };
  }, []);

  if (stage === "menu") {
    let msg = null;
    // console.log(value, parseInt(value));
    if (value !== "" && isNaN(parseInt(value))) {
      msg = <p style={{ color: "red", textAlign: "center" }}>Please input an integer!</p>;
    }
    return (
      <>
        <p className="Snake-menuPrompt">Please input grid size!</p>
        <div className="Snake-menu">
          <input className="Snake-input" onChange={handleChange} />
          <button className="Snake-button" onClick={startGame}>
            Start!
          </button>
        </div>
        {msg}
      </>
    );
  }
  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          className="Snake-gameBoard"
          style={{
            gridTemplateRows: `repeat(${getGridSize()}, 1fr)`,
            gridTemplateColumns: `repeat(${getGridSize()}, 1fr)`,
          }}
        >
          <Food />
          <SnakeBody />
        </div>
        {stage === "end" ? (
          <div className="Snake-finished">
            The Snake is dead!
            <button className="Snake-button Snake-restartButton" onClick={restartGame}>
              Restart!
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Snake;
