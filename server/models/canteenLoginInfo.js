const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const canteenSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["User", "Canteen"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  canteenImage: {
    type: String, // Assuming you're storing the URL or base64 string of the image
  },
});

const Canteen = mongoose.model('Canteen', canteenSchema);

module.exports = Canteen;
