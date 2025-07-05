const jwt = require("jsonwebtoken");
require("dotenv").config();
function verify(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied! No token provided." });
  }

  try {
    const decoded = jwt.verify(token,   process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Access Denied! No token provided." });
    }

    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid Token!" });
  }
}

module.exports = verify;
