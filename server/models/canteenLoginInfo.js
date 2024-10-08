const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the timing of each day
const dailyTimingSchema = new Schema({
  morning: { type: String, default: '' },
  afternoon: { type: String, default: '' },
  evening: { type: String, default: '' },
});

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
  contactNumber: {
    type: String,
    default: ''
  },
  overallRating: {
    type: Number,
    default: 0
  },
  canteenSocialMediaLinks: {
    Instagram: {
      type: String,
      default: ''
    },
    Facebook: {
      type: String,
      default: ''
    },
    LinkedIn: {
      type: String,
      default: ''
    },
    Youtube: {
      type: String,
      default: ''
    }
  },
  timing: {
    monday: dailyTimingSchema,
    tuesday: dailyTimingSchema,
    wednesday: dailyTimingSchema,
    thursday: dailyTimingSchema,
    friday: dailyTimingSchema,
    saturday: dailyTimingSchema,
    sunday: dailyTimingSchema,
  }
});

const Canteen = mongoose.model('Canteen', canteenSchema);

module.exports = Canteen;
