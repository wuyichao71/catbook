import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  googleid: String,
});

module.exports = mongoose.model("user", userSchema);
