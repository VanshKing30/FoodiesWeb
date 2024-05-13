const express = require("express");
const router = express.Router();
const multerUploads = require("../middleware/multer.middleware");
const uploadFile = require("../controllers/uploadFileController");

router.post("/upload", multerUploads, uploadFile);

module.exports = router;
