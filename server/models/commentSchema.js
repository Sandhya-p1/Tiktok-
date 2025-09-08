const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Comment", commentSchema);
