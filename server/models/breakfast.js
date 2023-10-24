const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const breakfastSchema = new Schema({
  canteen: {
    type: Schema.Types.ObjectId,
    ref: 'Canteen', // Reference to the Canteen model
    required: true,
  },
  dish: {
    type: String,
    required: true,
  },
  dishId : {
    type : String,
    required : true,
  }
});

const Breakfast = mongoose.model('Breakfast', breakfastSchema);

module.exports = Breakfast;
