import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import "./Game.css";
import "../../utilities.css";

const Game = () => {
  const { userId } = useOutletContext();
  // console.log(userId);
  return (
    <>
      <div className="Game-board">
        <Link to="/game/agar.io" className="u-link Game-link">
          Agar.io
        </Link>
        <Link to="/game/snake" className="u-link Game-link">
          Snake
        </Link>
        <Link to="/game/CanvasSnake" className="u-link Game-link">
          CanvasSnake
        </Link>
      </div>
      <Outlet context={{ userId: userId }} />
    </>
  );
};

export default Game;
