const { disconnect } = require("mongoose");

let io;

const userToSocketMap = {};
const socketToUserMap = {};

const getSocketFromSocketID = (socketid) => io.sockets.sockets.get(socketid);
const getAllConnectedUsers = () => Object.values(socketToUserMap);

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket != socket) {
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
  // for (const key of Object.keys(socketToUserMap)) {
  //   console.log(socketToUserMap[key].name, key);
  // }
};

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);
    io.on("connection", (socket) => {
      console.log(`connected, ${socket.id}`);
      socket.on("disconnect", (reason) => {
        console.log(`disconnected, ${socket.id}`);
      });
    });
    // io.on("connect", (socket) => {
    //   console.log(`Bhello, ${socket.id}`);
    //   socket.on("disconnect", (reason) => {});
    // });
  },
  addUser: addUser,

  getSocketFromSocketID: getSocketFromSocketID,
  getAllConnectedUsers: getAllConnectedUsers,

  getIo: () => io,
};
