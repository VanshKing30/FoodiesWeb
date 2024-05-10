const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth");

router.post("/studentSignup" , authController.studentSignup);
router.post("/studentLogin" ,  authController.studentLogin);
router.post("/canteenSignup" , authController.canteenSignup);
router.post("/canteenLogin" , authController.canteenLogin);
router.get("/verifyEmail/:verificationToken" , authController.verifyemail);
router.post("/resendVerificationEmail" , authController.resendVerificationEmail);


module.exports = router;