require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");

const jwtLoginRoutes = require("./routes/routeAuth");
const isAuthenticate = require("./middleware/jwtUserAuth");
const Video = require("./models/videoModelSchema");
const likeUnlikeRoutes = require("./routes/LikeUnlike");
const commentRoutes = require("./routes/comment");

const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//all about video
//using multer to upload files
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];

    cb(null, Date.now() + "." + ext);
  },
});

const upload = multer({ storage });

app.post(
  "/upload",
  isAuthenticate,
  upload.single("video"),
  async (req, res) => {
    try {
      const newVideo = new Video({
        fileName: req.file.originalname,
        filePath: `/uploads/${req.file.filename}`,
        uploadedBy: req.user.id,
      });
      await newVideo.save();
      res.json({
        message: "Video is uploaded",
        filePath: `/uploads/${req.file.filename}`,
      });
      // console.log("Uploaded file", req.file);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//getting uploaded video files
app.get("/files", isAuthenticate, async (req, res) => {
  try {
    const files = await Video.find({ uploadedBy: req.user.id }).populate(
      "uploadedBy",
      "username"
    );
    res.json(files);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});
//getting videos for the feed
app.get("/files/feed", async (req, res) => {
  try {
    const files = await Video.find()
      .populate("uploadedBy", "username")
      .sort({ uploadedAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

//deleting video
app.delete("/deleteVideo/:videoId", isAuthenticate, async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);

    if (!video) {
      return res.status(404).json({ message: "video is not found" });
    }

    if (video.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not Authorized" });
    }
    await video.deleteOne();

    res.status(200).json({ message: "Video deleted successfully", video });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.use("/uploads", express.static("uploads"));
// all about video above

//routes
app.use("/routeAuth", jwtLoginRoutes);
app.use("/likeUnlikeVideos", likeUnlikeRoutes);
app.use("/commentsData", commentRoutes);

//connecting to mongodb
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb Connected");
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
