import io from "socket.io-client";
import { post } from "./utilities";

const endpoint = window.location.hostname + ":" + window.location.port;
export const socket = io(endpoint);

console.log(endpoint);

socket.on("connect", () => {
  post("/api/initsocket", { socketId: socket.id });
  // console.log(`socket connected: ${socket.id}`);
  // console.log("connected");
});
