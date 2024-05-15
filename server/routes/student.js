const express = require("express");
const { auth, studentAuth, isCanteen } = require("../middlewares/auth");
const router = express.Router();
const authController = require("../controllers/Auth");

router.post("/studentSignup", authController.studentSignup);
router.post("/studentLogin", authController.studentLogin);
router.post("/canteenSignup", authController.canteenSignup);
router.post("/canteenLogin", authController.canteenLogin);
router.get("/studentLogout", studentAuth, authController.studentLogout);
router.get("/canteenLogout", auth, authController.canteenLogout);
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
