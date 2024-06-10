const multer = require('multer');
const storage = multer.memoryStorage();
const multerUploads = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // Set limit to 50MB
}).single("image");

module.exports = multerUploads;
