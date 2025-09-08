const express = require("express");
const router = express.Router();
const Video = require("../models/videoModelSchema");
const isAuthenticate = require("../middleware/jwtUserAuth");
const Comment = require("../models/commentSchema");

//comment
router.post("/comments/:videoId", isAuthenticate, async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video is not found" });

    const { text } = req.body;
    const newComment = new Comment({
      videoId,
      userId: req.user._id,
      text,
    });
    const saveComment = await newComment.save();
    await saveComment.populate("userId", "username");
    res.status(201).json({ saveComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/comments/:videoId", async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete
router.delete("/delete/:commentId", isAuthenticate, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json("Comment not found");
    if (comment.userId.toString() !== req.user._id.toString())
      return res.status(403).json("Not authorized");
    await comment.deleteOne();

    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
