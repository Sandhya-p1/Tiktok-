const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  uploadedBy: String,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", videoSchema);
