const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dinnerSchema = new Schema({
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

const Dinner = mongoose.model('Dinner', dinnerSchema);

module.exports = Dinner;
