const jwt = require("jsonwebtoken");
const User = require("../models/studentLoginInfo");
const Canteen = require("../models/canteenLoginInfo");

const forgotPasswordToken = (oldUser) => {
  const secret =
    process.env.JWT_SECRET + oldUser.password;
  const token = jwt.sign(
    {
      email: oldUser.email,
      id: oldUser._id,
    },
    secret,
    {
      expiresIn: "2m",
    }
  );
  return token;
};

const verifyToken = (oldUser, token) => {
  const secret =
    process.env.JWT_SECRET + oldUser.password;
  const verify = jwt.verify(token, secret);

  return verify;
};

const findUserByEmail = async (email) => {
  let user = await User.findOne({ email });
  if (!user) {
    user = await Canteen.findOne({ email });
  }
  return user;
};

const findUserById = async (id) => {
  let user = await User.findById(id);
  if (!user) {
    user = await Canteen.findById(id);
  }
  return user;
};


module.exports = {
  forgotPasswordToken,
  verifyToken,
  findUserById,
  findUserByEmail,
};
