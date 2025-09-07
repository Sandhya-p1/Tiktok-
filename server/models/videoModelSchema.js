const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  uploadedBy: { type: String, ref: "User" },
  uploadedAt: { type: Date, default: Date.now },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  commentedBy: [
    {
      type: String,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Video", videoSchema);
