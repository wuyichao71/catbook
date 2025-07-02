const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  sender: {
    _id: String,
    name: String,
  },
  recipient: {
    _id: String,
    name: String,
  },
  timestamp: { type: Date, default: Date.now },
  content: String,
});

module.exports = mongoose.model("message", messageSchema);
