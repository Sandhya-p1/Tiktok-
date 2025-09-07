require("dotenv").config();
const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/userModelSchema");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // console.log("data on register:", req.body);
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: "User is registered" });
  } catch (error) {
    // console.log("Register error:", error);

    res.status(400).json({ error: error.message });
  }
});

//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found " });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Wrong Password. Try Again !!" });
    const payload = { id: user._id, username: username };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      })
      .json({ message: "Login Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//logout
router.post("/logout", async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    })

    .json({ message: "logout successful" });
});

module.exports = router;
