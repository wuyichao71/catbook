const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  creator_name: String,
  creator_id: String,
  parent: String,
  content: String,
});

module.exports = mongoose.model("comment", commentSchema);
