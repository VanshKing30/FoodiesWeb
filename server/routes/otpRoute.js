const express = require("express");
const sendOTP = require("../controllers/otpController.js");

const router = express.Router();
router.post("/sendotp", sendOTP);

module.exports = router;
