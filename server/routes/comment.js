const express = require("express");
const router = express.Router();
const Video = require("../models/videoModelSchema");
const isAuthenticate = require("../middleware/jwtUserAuth");

//comment
router.post("/comments/:videoId", isAuthenticate, async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const userId = req.user.id;
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video is not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
