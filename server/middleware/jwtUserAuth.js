const jwt = require("jsonwebtoken");

function isAuthenticate(req, res, next) {
  const token = req.cookies?.token;
  if (!token)
    return res.status(400).json({
      message: "Token is not provided",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error,
    });
  }
}
module.exports = isAuthenticate;
