const express = require("express");
const { auth, studentAuth, isCanteen } = require("../middlewares/auth");
const router = express.Router();
const authController = require("../controllers/Auth");
const { getCanteenData } = require("../controllers/canteenController");
const feedbackController = require("../controllers/feedbackController");

router.post("/studentSignup", authController.studentSignup);
router.post("/studentLogin", authController.studentLogin);
router.post("/canteenSignup", authController.canteenSignup);
router.post("/canteenLogin", authController.canteenLogin);
router.post("/VerifyUser", authController.forgotPassword);
router.get("/resetPassword/:id/:token", authController.verifyLink);
router.post("/newPassword/:id/:token", authController.resetPassword);
router.get("/studentLogout", studentAuth, authController.studentLogout);
router.post("/contact", authController.Contact);
router.get("/canteenLogout", auth, authController.canteenLogout);
router.get("/canteen/:id", getCanteenData);
router.post('/submitFeedback', feedbackController.submitFeedback);
router.get('/feedbacks/:canteenId', feedbackController.getFeedbacksByCanteen);

router.post(
  "/changeStudentPassword",
  studentAuth,
  authController.changeStudentPassword
);
router.post(
  "/changeCanteenPassword",
  auth,
  isCanteen,
  authController.changeCanteenPassword
);

module.exports = router;
