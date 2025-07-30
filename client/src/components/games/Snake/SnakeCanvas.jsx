import { useEffect, useRef } from "react";
import { setId, canvasMain, setCanvas, initGame } from "./Snake-game.js";

import "./SnakeCanvas.css";

export default function SnakeCanvas(props) {
  const canvasRef = useRef(null);
  useEffect(() => {
    setCanvas(canvasRef.current);
    initGame(props.gridSize);
    setId(window.requestAnimationFrame(canvasMain));
  }, []);
  return (
    <div className="SnakeCanvas-container">
      <canvas className="SnakeCanvas-gameBoard" width="400" height="400" ref={canvasRef}></canvas>
    </div>
  );
}
