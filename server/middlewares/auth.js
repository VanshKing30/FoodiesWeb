const Canteen = require("../models/canteenLoginInfo");
const User = require("../models/studentLoginInfo");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Utility function to extract token from various sources
const extractToken = (req) => {
  if (req.cookies && req.cookies.token) return req.cookies.token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    return req.headers.authorization.split(" ")[1];
  }
  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});
    return cookies.token;
  }
  return null;
};

// Auth middleware for canteen
exports.auth = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Canteen.findById(decode.id);
      if (!user) {
        return res.status(500).json({
          success: false,
          message: "Invalid user! Try to login again",
        });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Something went wrong while validating the token: ${error.message}`,
    });
  }
};

// Auth middleware for student
exports.studentAuth = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.id);
      if (!user) {
        return res.status(500).json({
          success: false,
          message: "Invalid user! Try to login again",
          
        });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Something went wrong while validating the token: ${error.message}`,
    });
  }
};

// isCanteen middleware
exports.isCanteen = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Canteen") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
        data: req.user,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
