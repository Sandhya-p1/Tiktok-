const jwt = require("jsonwebtoken");
const User = require("../models/userModelSchema");
async function isAuthenticate(req, res, next) {
  const token = req.cookies?.token;
  if (!token)
    return res.status(400).json({
      message: "Token is not provided",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    // fetch full user doc
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error,
    });
  }
}
module.exports = isAuthenticate;
