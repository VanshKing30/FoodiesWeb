const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lunchSchema = new Schema({
  canteen: {
    type: Schema.Types.ObjectId,
    ref: 'Canteen', // Reference to the Canteen model
    required: true,
  },
  dish: {
    type: String,
    required: true,
  },
  dishId: {
    type: String,
    required: true,
  },
  dishImage: {
    type: String, // Store URL or base64 representation of image
    default: '', // Default value if not provided
  },
  description: {
    type: String,
    default: '', // Default value if not provided
  },
});

const Lunch = mongoose.model('Lunch', lunchSchema);

module.exports = Lunch;
