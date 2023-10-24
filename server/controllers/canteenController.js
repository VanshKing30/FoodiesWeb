const asyncHandler = require('express-async-handler');
const Breakfast = require('../models/breakfast');
const Lunch = require('../models/lunch');
const Dinner = require('../models/dinner');
const Canteen = require("../models/canteenLoginInfo");



const getAllCanteen = async (req ,res , next) =>{
  
  try{
    const canteenData = await Canteen.find({});
    
    res.status(200)
    .json({
      success : true,
      data : canteenData,
      message : "Entire canteens fetched"
    });
  }
  catch(error){
    res.status(500).json({success : false , error : error});
  }
};

const getBreakfast = async(req , res , next) =>{
  
  try{
    const id  = req.params.id;
    console.log(id);
    const breakfastData = await Breakfast.find({ canteen: id }).select("dish").select("dishId").exec();

    
    res.status(200)
    .json({
      success : true,
      data : breakfastData,
      message : "Entire breakfast was fetched"
    });
  }
  catch(error){
    res.status(500).json({success : false , error : error});
  }
}

const getLunch = async(req , res , next) =>{
  
  try{
    const id  = req.params.id;
    
    const lunchData = await Lunch.find({ canteen: id }).select("dish").select("dishId").exec();

    
    res.status(200)
    .json({
      success : true,
      data : lunchData,
      message : "Entire lunch was fetched"
    });
  }
  catch(error){
    res.status(500).json({success : false , error : error});
  }
}

const getDinner = async(req , res , next) =>{
  
  try{
    const id  = req.params.id;
    const dinnerData = await Dinner.find({ canteen: id }).select("dish").select("dishId").exec();

    
    res.status(200)
    .json({
      success : true,
      data : dinnerData,
      message : "Entire dinner was fetched"
    });
  }
  catch(error){
    res.status(500).json({success : false , error : error});
  }
}

// Controller function to get the canteen's dashboard
const getCanteenDashboard = asyncHandler(async (req, res, next) => {
  const canteenId = req.params.id;

  const breakfastDishes = await Breakfast.find({ canteen: canteenId }).select('dish').exec();
  const lunchDishes = await Lunch.find({ canteen: canteenId }).select('dish').exec();
  const dinnerDishes = await Dinner.find({ canteen: canteenId }).select('dish').exec();

  res.json({
    breakfast: breakfastDishes.length > 0 ? breakfastDishes : ['Not Added Yet'],
    lunch: lunchDishes.length > 0 ? lunchDishes : ['Not Added Yet'],
    dinner: dinnerDishes.length > 0 ? dinnerDishes : ['Not Added Yet'],
  });
});

// Controller function to add a breakfast dish
const addBreakfastDish = asyncHandler(async (req, res, next) => {
  const canteenId = req.params.id;
  const { dish , dishId } = req.body;

  const existingDish = await Breakfast.findOne({ canteen: canteenId, dish }).exec();

  if (existingDish) {
    return res.json({ message: 'Dish already added' });
  }

  const newDish = new Breakfast({ canteen: canteenId, dish , dishId });
  await newDish.save();

  res.json({ message: 'Dish added successfully' });
});

// Controller function to remove a breakfast dish
const removeBreakfastDish = asyncHandler(async (req, res, next) => {
  const canteenId = req.params.id;
  const { dish } = req.body;

  await Breakfast.deleteOne({ canteen: canteenId, dish }).exec();
  res.json({ message: 'Dish removed successfully' });
});

// Implement similar functions for lunch and dinner dishes
// addLunchDish, removeLunchDish, addDinnerDish, and removeDinnerDish

// Controller function to add a lunch dish
const addLunchDish = asyncHandler(async (req, res, next) => {
  const canteenId = req.params.id;
  const { dish, dishId } = req.body;

  const existingDish = await Lunch.findOne({ canteen: canteenId, dish }).exec();

  if (existingDish) {
    return res.json({ message: 'Dish already added' });
  }

  const newDish = new Lunch({ canteen: canteenId, dish , dishId });
  await newDish.save();

  res.json({ message: 'Dish added successfully' });
});

// Controller function to remove a lunch dish
const removeLunchDish = asyncHandler(async (req, res, next) => {
  const canteenId = req.params.id;
  const { dish } = req.body;

  await Lunch.deleteOne({ canteen: canteenId, dish }).exec();
  res.json({ message: 'Dish removed successfully' });

});

// Controller function to add a dinner dish
const addDinnerDish = asyncHandler(async (req, res, next) => {
  const canteenId = req.params.id;
  const { dish , dishId} = req.body;

  const existingDish = await Dinner.findOne({ canteen: canteenId, dish }).exec();

  if (existingDish) {
    return res.json({ message: 'Dish already added' });
  }

  const newDish = new Dinner({ canteen: canteenId, dish ,dishId});
  await newDish.save();

  res.json({ message: 'Dish added successfully' });

});

// Controller function to remove a dinner dish
const removeDinnerDish = asyncHandler(async (req, res, next) => {
  const canteenId = req.params.id;
  const { dish } = req.body;

  await Dinner.deleteOne({ canteen: canteenId, dish }).exec();
  res.json({ message: 'Dish removed successfully' });

});

module.exports = {
  getCanteenDashboard,
  addBreakfastDish,
  removeBreakfastDish,
  addLunchDish,
  removeLunchDish,
  addDinnerDish,
  removeDinnerDish,
  getAllCanteen,
  getBreakfast,
  getLunch,
  getDinner,
};
