import { drawCanvas } from "../../canvasManager";
import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { socket } from "../../socket-client.js";

const Agar = () => {
  const { userId } = useOutletContext();
  const canvasRef = useRef(null);
  let loginModal = null;
  useEffect(() => {
    socket.on("update", processUpdate);
    return () => {
      socket.off("update", processUpdate);
    };
  }, []);

  const processUpdate = (update) => {
    // console.log(update);
    drawCanvas(update, canvasRef);
  };

  if (!userId) {
    loginModal = <div> Please Login First! </div>;
  }
  return (
    <>
      <div>
        <canvas ref={canvasRef} width="500" height="500" />
        {loginModal}
      </div>
    </>
  );
};

export default Agar;
