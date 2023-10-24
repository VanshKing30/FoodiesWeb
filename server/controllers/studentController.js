const asyncHandler = require('express-async-handler');
const Canteen = require('../models/canteenLoginInfo');
const Breakfast = require('../models/breakfast');
const Lunch = require('../models/lunch');
const Dinner = require('../models/dinner');


const fetchDishesByModel = async (canteenId, model) => {
    const dishes = await model.find({ canteen: canteenId }).select('dish').exec();
    return dishes.length > 0 ? dishes : ['Not Added Yet'];
};

const getCanteenBreakfastDishes = asyncHandler(async (req, res, next) => {
  const canteenID= req.params.id;
  const dishes = fetchDishesByModel(canteenID, Breakfast);
  res.json(dishes);
});

const getCanteenLunchDishes = asyncHandler(async (req, res, next) => {
  const canteenID= req.params.id;
  const dishes = fetchDishesByModel(canteenID, Lunch);
  res.json(dishes);
});
const getCanteenDinnertDishes = asyncHandler(async (req, res, next) => {
  const canteenID= req.params.id;
  const dishes = fetchDishesByModel(canteenID, Dinner);
  res.json(dishes);
});

module.exports = {
  getCanteenBreakfastDishes,
  getCanteenDinnertDishes,
  getCanteenLunchDishes,
};