import io from "socket.io-client";
import { post } from "./utilities";

const endpoint = window.location.hostname + ":" + window.location.port;
export const socket = io(endpoint);

socket.on("connect", () => {
  post("/api/initsocket", { socketId: socket.id });
});
