const nodemailer = require("nodemailer");
const otpTemplate = require("./EmailTemplet.js");

const sendMail = async ({ receiver, otp }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,

      port: process.env.MAIL_PORT,

      auth: {
        user: process.env.MAIL_AUTH_USER,

        pass: process.env.MAIL_AUTH_PASSWORD,
      },
    });
    console.log("OTP is: ", otp);

    const info = await transporter.sendMail({
      from: "no-reply@example.com", // sender address
      to: receiver, // list of receivers
      subject: "Verify your email",
      html: otpTemplate(otp),
    });
    console.log(info);

    return info;
  } catch (error) {
    console.log("something went wrong while sending mail", error);
  }
};

module.exports = { sendMail };
