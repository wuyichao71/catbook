const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  creator_name: String,
  content: String,
});

module.exports = mongoose.model("story", storySchema);
