const express = require("express");

const Story = require("./models/story");
const Comment = require("./models/comment");
const User = require("./models/user");
const auth = require("./auth");

const router = express.Router();
router.get("/test", (req, res) => {
  console.log(`METHOD: ${req.method} ${req.url}`);
  res.send({ message: "Example API endpoint" });
});

router.get("/story", (req, res) => {
  console.log(`METHOD: ${req.method} ${req.url}`);
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
  console.log(`METHOD: ${req.method} ${req.url}`);
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
