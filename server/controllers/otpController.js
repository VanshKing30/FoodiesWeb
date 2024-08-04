const OTP = require("../models/otp-model.js");
const User = require("../models/studentLoginInfo");
const otpGenerator = require("otp-generator");
const { sendMail } = require("../utils/Mailer.js");
const {
  forgotPasswordToken,
  verifyToken,
  findUserByEmail,
  findUserById,
} = require("../utils/PasswordTokenAndUser.js");
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "You haven't entered the email!",
        success: false,
      });
    }
    const studentExists = await User.findOne({ email });
    if (!studentExists) {
      return res.status(401).json({
        success: false,
        message: "No user with the given email is registered!",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }
    const otpSent = await OTP.create({
      email,
      otp,
    });
    if (!otpSent) {
      return res.status(500).json({
        message: "The OTP was not sent",
        success: false,
      });
    }
    const info = await sendMail({ receiver: email, otp });
    if (!info) {
      console.error("Something went wrong while sending email");
      return res.status(500).json({
        message: "Something went wrong in mailing the person",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (err) {
    console.error("Something went wrong while sending OTP", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      err,
    });
  }
};
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email or OTP not provided!",
        success: false,
      });
    }
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP or email!",
      });
    }
    await OTP.deleteOne({ email, otp });
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      const tokenReturn = forgotPasswordToken(existingUser);
      const link = `/api/v1/newPassword/${existingUser._id}/${tokenReturn}`;
      console.log("Link is:", link);
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        link: link,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "The email can't be found in the database!",
      });
    }
  } catch (err) {
    console.error("Something went wrong while verifying OTP", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      err,
    });
  }
};
module.exports = { sendOTP, verifyOTP };
