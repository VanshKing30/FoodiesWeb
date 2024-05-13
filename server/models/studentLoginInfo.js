const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  collegeName: {
    type: String,
  },
  accountType: {
    type: String,
    enum: ["User", "Canteen"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
