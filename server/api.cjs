const express = require("express");

const Story = require("./models/story.cjs");
const Comment = require("./models/comment.cjs");
const User = require("./models/user.cjs");
const Message = require("./models/message.cjs");
const auth = require("./auth.cjs");

const socketManager = require("./server-socket.cjs");

const router = express.Router();
router.get("/test", (req, res) => {
  console.log(`METHOD: ${req.method} ${req.url}`);
  res.send({ message: "Example API endpoint" });
});

router.get("/story", (req, res) => {
  // console.log(`METHOD: ${req.method} ${req.url}`);
  Story.find({}).then((stories) => {
    res.send(stories);
  });
});

router.post("/story", (req, res) => {
  console.log(`METHOD: ${req.method} ${req.url}`);
  if (req.user) {
    const newStory = new Story({
      content: req.body.content,
      creator_name: req.user.name,
      creator_id: req.user._id,
    });
    newStory.save().then((savedStory) => {
      res.send(savedStory);
    });
  } else {
    res.status(400).send({ message: "User is not logged in!" });
  }
});

router.get("/comment", (req, res) => {
  // console.log(`METHOD: ${req.method} ${req.url}`);
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", (req, res) => {
  console.log(`METHOD: ${req.method} ${req.url}`);
  const newComment = new Comment({
    content: req.body.content,
    creator_name: req.user.name,
    creator_id: req.user.googleid,
    parent: req.body.parent,
  });
  newComment.save().then((savedComment) => {
    res.send(savedComment);
  });
});

router.get("/user", (req, res) => {
  User.findById(req.query.userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(400).send({ message: "The user does not exist!" });
      console.log(err.message);
    });
});

router.get("/chat", (req, res) => {
  if (!req.user) {
    res.send({});
    return;
  }
  let query;
  if (req.query.recipient_id === "ALL_CHAT") {
    query = { "recipient._id": req.query.recipient_id };
  } else {
    query = {
      $or: [
        { "sender._id": req.user._id, "recipient._id": req.query.recipient_id },
        { "sender._id": req.query.recipient_id, "recipient._id": req.user._id },
      ],
    };
  }
  Message.find(query).then((message) => res.send(message));
});

router.post("/message", auth.ensureLoggedIn, (req, res) => {
  console.log(`Received a chat message from ${req.user.name}: ${req.body.content}`);

  // console.log(req.body.recipient);
  const message = new Message({
    recipient: req.body.recipient,
    sender: {
      _id: req.user._id,
      name: req.user.name,
    },
    content: req.body.content,
  });
  message.save();
  if (req.body.recipient._id === "ALL_CHAT") {
    socketManager.getIo().emit("message", message);
  } else {
    // console.log(message);
    // console.log(req.user._id);
    // console.log(req.body.recipient._id);
    socketManager.getSocketFromUserID(req.user._id)?.emit("message", message);
    if (req.user._id !== req.body.recipient._id) {
      socketManager.getSocketFromUserID(req.body.recipient._id)?.emit("message", message);
    }
  }
  res.send({});
});

router.get("/activeUsers", (req, res) => {
  res.send({ activeUsers: socketManager.getAllConnectedUsers() });
});

router.post("/initsocket", (req, res) => {
  if (req.user) {
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketId));
  }
  res.send({});
});

router.post("/login", auth.login);
router.get("/auth/github", auth.githubLogin);
router.get("/auth/github/callback", auth.githubCallback);

router.post("/logout", auth.logout);

router.get("/whoami", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send({});
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
