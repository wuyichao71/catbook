const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  uid: String,
  from: String,
});

module.exports = mongoose.model("user", userSchema);
