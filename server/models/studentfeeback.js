const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentfeedbackSchema = new Schema({
  message: { type: String, required: true },
  canteenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Canteen', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudentFeedback', studentfeedbackSchema );
