const bcrypt = require("bcrypt");
const User = require("../models/studentLoginInfo");
const jwt = require("jsonwebtoken");
const Canteen = require("../models/canteenLoginInfo");
const Session = require("../models/session");
require("dotenv").config();

exports.studentSignup = async (req, res) => {
  try {
    const { name, email, collegeName, accountType, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      collegeName,
      accountType,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered",
    });
  }
};

exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      const session = new Session({ userId: user._id, token });
      await session.save();

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
      res.json({ success: true, message: "Logged in successfully", token, user });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failure",
    });
  }
};

exports.studentLogout = async (req, res) => {
  try {
    const token = req.cookies?.token || req?.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      await Session.findOneAndDelete({ token });
      res.clearCookie("token");
    }
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Logout failure",
    });
  }
};

exports.changeStudentPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid old password",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = newHashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

exports.canteenSignup = async (req, res) => {
  try {
    const { name, email, collegeName, accountType, password } = req.body;
    const existingCanteen = await Canteen.findOne({ email });

    if (existingCanteen) {
      return res.status(400).json({
        success: false,
        message: "Canteen already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const canteen = await Canteen.create({
      name,
      email,
      collegeName,
      accountType,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "Canteen created successfully",
      cantId: canteen._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Canteen cannot be registered",
    });
  }
};

exports.canteenLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    let canteen = await Canteen.findOne({ email });
    if (!canteen) {
      return res.status(401).json({
        success: false,
        message: "Canteen is not registered",
      });
    }

    const payload = {
      email: canteen.email,
      id: canteen._id,
      accountType: canteen.accountType,
    };

    if (await bcrypt.compare(password, canteen.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      const session = new Session({ userId: canteen._id, token });
      await session.save();

      canteen = canteen.toObject();
      canteen.token = token;
      canteen.password = undefined;

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
      res.json({ success: true, message: "Logged in successfully", token, canteen, cantId: canteen._id });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failure",
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get user details",
    });
  }
};

exports.editUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, collegeName } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.collegeName = collegeName || user.collegeName;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user details",
    });
  }
};
