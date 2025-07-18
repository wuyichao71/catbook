import { drawCanvas } from "../../canvasManager";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { socket } from "../../socket-client.ts";
import { handleInput } from "../../input.ts";
import { post } from "../../utilities.js";

import "./Agar.css";

const Agar = () => {
  const { userId } = useOutletContext();
  const canvasRef = useRef(null);
  const [winnerModal, setWinnerModal] = useState(null);
  useEffect(() => {
    window.addEventListener("keydown", handleInput);
    return () => {
      window.removeEventListener("keydown", handleInput);
      post("/api/despawn", { userId: userId });
    };
  });
  useEffect(() => {
    socket.on("update", processUpdate);
    return () => {
      socket.off("update", processUpdate);
    };
  }, []);

  const processUpdate = (update) => {
    if (update.winner) {
      setWinnerModal(
        <div className="Agar-winner">the winner is {update.winner} yay cool cool</div>
      );
    } else {
      setWinnerModal(null);
    }
    drawCanvas(update, canvasRef);
  };

  let spawnButton = null;
  if (userId) {
    spawnButton = (
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => {
            post("/api/spawn", { userId: userId });
          }}
        >
          Spawn
        </button>
      </div>
    );
  }

  let loginModal = null;
  if (!userId) {
    loginModal = <div> Please login first! </div>;
  }
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <canvas ref={canvasRef} width="500" height="500" style={{ margin: "0 auto" }} />
        {loginModal}
        {winnerModal}
        {spawnButton}
      </div>
    </>
  );
};

export default Agar;
