const express = require("express");

const Story = require("./models/story");
const Comment = require("./models/comment");
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
  // if (typeof stories === "undefined") {
  //   console.error("Stories are not defined");
  //   return res.status(500).send({ error: "Stories not found" });
  // }
  // res.send(stories);
});

router.post("/story", (req, res) => {
  console.log(`METHOD: ${req.method} ${req.url}`);
  const newStory = new Story(req.body);
  newStory.save().then((savedStory) => {
    res.send(savedStory);
  });
});

router.get("/comment", (req, res) => {
  console.log(`METHOD: ${req.method} ${req.url}`);
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", (req, res) => {
  console.log(`METHOD: ${req.method} ${req.url}`);
  const newComment = new Comment(req.body);
  newComment.save().then((savedComment) => {
    res.send(savedComment);
  });
});

router.post("/login", auth.login);

router.post("/logout", auth.logout);

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
