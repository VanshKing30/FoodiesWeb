#! /usr/bin/env node
const bcrypt = require("bcrypt");

console.log(
  'This script populates the database with dummy data. Specified database URL as argument - e.g.: node populateDB.js "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/"'
);

// Get the database URL from the command line argument
const userArgs = process.argv.slice(2);
const databaseURL = userArgs[0];


// Import the necessary Mongoose models
const Canteen = require("./models/canteenLoginInfo");
const Student = require("./models/studentLoginInfo");
const Breakfast = require("./models/breakfast");
const Lunch = require("./models/lunch");
const Dinner = require("./models/dinner");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Debug: Connected to the database");

  // Populate your data
  await createCanteens();
  await createStudents();
  await createBreakfasts();
  await createLunches();
  await createDinners();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function canteenCreate(name, collegeName, email, password, accountType) {
  password = await hashPassword(password);
  const canteen = new Canteen({
    name,
    collegeName,
    email,
    accountType,
    password,
  });
  await canteen.save();
  console.log(`Added canteen: ${name}`);
}

async function studentCreate(name, email, collegeName, password, accountType) {
  password = await hashPassword(password);
  const student = new Student({
    name,
    email,
    collegeName,
    accountType,
    password,
  });
  await student.save();
  console.log(`Added student: ${name}`);
}

async function createCanteens() {
  console.log("Adding canteens");
  await Promise.all([
    canteenCreate(
      "Canteen 1",
      "College A",
      "canteen1@example.com",
      "password1",
      "Canteen"
    ),
    canteenCreate(
      "Canteen 2",
      "College B",
      "canteen2@example.com",
      "password2",
      "Canteen"
    ),
    // Add more canteens as needed
  ]);
}

async function createStudents() {
  console.log("Adding students");
  await Promise.all([
    studentCreate(
      "Student 1",
      "student1@example.com",
      "College A",
      "password1",
      "User"
    ),
    studentCreate(
      "Student 2",
      "student2@example.com",
      "College B",
      "password2",
      "User"
    ),
    // Add more students as needed
  ]);
}

async function breakfastCreate(dishId, dish, canteen) {
  const breakfast = new Breakfast({
    dishId,
    dish,
    canteen,
  });
  await breakfast.save();
  console.log(`Added breakfast dish: ${dish}`);
}
async function lunchCreate(dishId, dish, canteen) {
  const lunch = new Lunch({
    dishId,
    dish,
    canteen,
  });
  await lunch.save();
  console.log(`Added lunch dish: ${dish}`);
}

async function dinnerCreate(dishId, dish, canteen) {
  const dinner = new Dinner({
    dishId,
    dish,
    canteen,
  });
  await dinner.save();
  console.log(`Added dinner dish: ${dish}`);
}

async function createBreakfasts() {
  console.log("Adding breakfast dishes");
  const canteen1 = await Canteen.findOne({ name: "Canteen 1" });
  const canteen2 = await Canteen.findOne({ name: "Canteen 2" });

  await Promise.all([
    breakfastCreate("1", "Pancakes", canteen1._id),
    breakfastCreate("2", "Omelette", canteen1._id),
    breakfastCreate("3", "French Toast", canteen2._id),
    breakfastCreate("4", "Waffles", canteen2._id),
  ]);
}

async function createLunches() {
  console.log("Adding lunch dishes");
  const canteen1 = await Canteen.findOne({ name: "Canteen 1" });
  const canteen2 = await Canteen.findOne({ name: "Canteen 2" });

  await Promise.all([
    lunchCreate("1", "Burger", canteen1._id),
    lunchCreate("2", "Pizza", canteen1._id),
    lunchCreate("3", "Sandwich", canteen2._id),
    lunchCreate("4", "Salad", canteen2._id),
  ]);
}

async function createDinners() {
  console.log("Adding dinner dishes");
  const canteen1 = await Canteen.findOne({ name: "Canteen 1" });
  const canteen2 = await Canteen.findOne({ name: "Canteen 2" });

  await Promise.all([
    dinnerCreate("1", "Spaghetti", canteen1._id),
    dinnerCreate("2", "Steak", canteen1._id),
    dinnerCreate("3", "Sushi", canteen2._id),
    dinnerCreate("4", "Chicken Curry", canteen2._id),
  ]);
}
