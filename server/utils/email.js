const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { gmailContent } = require('./emailTemplate.js');

dotenv.config();
const secret_key = process.env.JWT_SECRET;

function generateverificationToken(email) {
    return jwt.sign({ email: email }, secret_key, { expiresIn: '1d' });
}

async function sendVerificationEmail(recipientEmail, verificationToken, username) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        });

        const emailcontent = gmailContent(verificationToken, username);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Email Verification',
            html: emailcontent
        });

        console.log("Verification email has been sent");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}

module.exports = { generateverificationToken, sendVerificationEmail };