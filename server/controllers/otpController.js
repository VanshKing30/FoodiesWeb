const OTP = require("../models/otp-model.js");
const User = require("../models/studentLoginInfo");
const otpGenerator = require("otp-generator");
const { sendMail } = require("../utils/Mailer.js");

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "You Haven't Entered the Email!",
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
      return res
        .status(500)
        .json({ message: "The Otp Was not Sent", success: false });
    }

    const info = await sendMail({ receiver: email, otp });
    if (!info) {
      console.log("Something went wrong while sending email");
      return res.status(500).json({
        message: "Something Went Wrong in mailing the person",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (err) {
    console.log("Something went wrong while sending OTP", err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, err });
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
        message: "Invalid OTP or Email!",
      });
    }

    // Optional: Check if OTP is expired (depending on your expiration logic)
    // const isExpired = checkOtpExpiration(otpRecord); // Implement this function if needed
    // if (isExpired) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "OTP is expired!",
    //   });
    // }

    // OTP is valid, perform necessary actions (e.g., mark user as verified)

    // Optionally delete the OTP record after verification
    await OTP.deleteOne({ email, otp });

    return res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
    });
  } catch (err) {
    console.log("Something went wrong while verifying OTP", err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, err });
  }
};

module.exports = { sendOTP, verifyOTP };
