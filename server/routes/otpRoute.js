const express = require("express");
const { sendOTP, verifyOTP } = require("../controllers/otpController.js");

const router = express.Router();

router.post("/sendotp", sendOTP);
router.post("/verifyotp", verifyOTP);

module.exports = router;
