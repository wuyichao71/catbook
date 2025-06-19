const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  creator_name: String,
  parent: String,
  content: String,
});

module.exports = mongoose.model("comment", commentSchema);
