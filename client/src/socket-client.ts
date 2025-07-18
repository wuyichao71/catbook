import io from "socket.io-client";
import { post } from "./utilities.js";
const endpoint = window.location.hostname + ":" + window.location.port;
export const socket = io(endpoint);
socket.on("connect", () => {
  post("/api/initsocket", { socketId: socket.id });
});

export const move = (dir:string) => {
  socket.emit("move", dir);
};
