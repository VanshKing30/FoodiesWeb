const fs = require("fs");
const path = require("path");
const { uploader } = require("../config/cloudinaryConfig");

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Write the image buffer to a file
    const fileName = Date.now() + "-" + req.file.originalname;
    const dirPath = path.resolve("public", "uploads");
    const filePath = path.join(dirPath, fileName);

    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        return res.status(500).send("Error creating directory.");
      }

      fs.writeFile(filePath, req.file.buffer, (err) => {
        if (err) {
          return res.status(500).send("Error saving file.");
        }

        // Upload the file to Cloudinary
        uploader
          .upload(filePath)
          .then((result) => {
            const image = result.url;
            return res.status(200).json({
              messge: "Your image has been uploded successfully to cloudinary",
              data: {
                image,
              },
            });
          })
          .catch((err) => {
            return res.status(500).send("Error uploading file to Cloudinary.");
          });
      });
    });
  } catch (err) {
    return res.status(500).send("An unexpected error occurred.");
  }
};

module.exports = uploadFile;
