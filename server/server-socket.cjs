const gameLogic = require("./game-logic.cjs");

let io;

const userToSocketMap = {};
const socketToUserMap = {};

const getSocketFromSocketID = (socketid) => io.sockets.sockets.get(socketid);
const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getAllConnectedUsers = () => Object.values(socketToUserMap);

const sendGameState = () => {
  io.emit("update", gameLogic.gameState);
};

const startRunningGame = () => {
  setInterval(() => {
    gameLogic.updateGameState();
    sendGameState();
  }, 1000 / 60);
};

startRunningGame();

const addUserToGame = (user) => {
  gameLogic.spawnPlayer(user._id);
};

const removeUserFromGame = (user) => {
  gameLogic.removePlayer(user._id);
};

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket.id !== socket.id) {
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
};

const removeUser = (user, socket) => {
  if (user) {
    delete userToSocketMap[user._id];
  }
  delete socketToUserMap[socket.id];
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
};

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);
    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });
      socket.on("move", (dir) => {
        const user = getUserFromSocketID(socket.id);
        if (user) gameLogic.movePlayer(user._id, dir);
      });
    });
  },
  addUser: addUser,
  removeUser: removeUser,

  getSocketFromSocketID: getSocketFromSocketID,
  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getAllConnectedUsers: getAllConnectedUsers,
  addUserToGame: addUserToGame,
  removeUserFromGame: removeUserFromGame,
  getIo: () => io,
};
