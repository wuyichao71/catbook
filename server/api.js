const express = require("express");

const Story = require("./models/story");
const Comment = require("./models/comment");

// const story1 = {
//   _id: "id1",
//   creator_name: "Stanley Zhao",
//   content: "Hi everyone",
// };
// const story2 = {
//   _id: "id2",
//   creator_name: "Abby Chou",
//   content: "Web.lab rocks",
// };
// const story3 = {
//   _id: "id3",
//   creator_name: "Andy Jiang",
//   content: "I like cats",
// };
// const stories = [story1, story2, story3];

// const comment1 = {
//   _id: "commentid1",
//   creator_name: "Daniel Hong",
//   parent: "id1",
//   content: "Hi Stanley",
// };
// const comment2 = {
//   _id: "commentid2",
//   creator_name: "Lucas Bautista",
//   parent: "id2",
//   content: "I agree!",
// };
// const comment3 = {
//   _id: "commentid3",
//   creator_name: "Stanley Zhao",
//   parent: "id1",
//   content: "Hi Daniel",
// };
// const comments = [comment1, comment2, comment3];

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
  // res.send(comments.filter((comment) => comment.parent === req.query.parent));
  // res.send([]);
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

module.exports = router;
