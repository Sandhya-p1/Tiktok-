const express = require("express");
const router = express.Router();
const Video = require("../models/videoModelSchema");
const isAuthenticate = require("../middleware/jwtUserAuth");

//like and unlike the video
router.put("/likeUnlike/:videoId", isAuthenticate, async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const userId = req.user.id;
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video is not found" });

    if (video.likedBy.includes(userId)) {
      video.likedBy.pull(userId);
    } else {
      video.likedBy.push(userId);
    }
    await video.save();
    res.json({
      likedBy: video.likedBy,
      totatLikes: video.likedBy.length,
      message: "like and unlike update successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
