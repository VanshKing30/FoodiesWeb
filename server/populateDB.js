#! /usr/bin/env node

console.log(
    'This script populates the database with dummy data. Specified database URL as argument - e.g.: node populatedb "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>"'
  );
  
  // Get the database URL from the command line argument
  const userArgs = process.argv.slice(2);
  const databaseURL = process.env.DATABASE_URI;
  
  // Import the necessary Mongoose models
  const Canteen = require('./models/canteenLoginInfo');
  const Student = require('./models/studentLoginInfo');
  const Breakfast = require('./models/breakfast');
  const Lunch = require('./models/lunch');
  const Dinner = require('./models/dinner');
  
  const mongoose = require('mongoose');
  mongoose.set('strictQuery', false);
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Debug: Connected to the database');
  
    // Populate your data
    await createCanteens();
    await createStudents();
    await createBreakfasts();
    await createLunches();
    await createDinners();
  
    console.log('Debug: Closing mongoose');
    mongoose.connection.close();
  }
  
  async function canteenCreate(name, collegeName, email, password) {
    const canteen = new Canteen({
      name,
      collegeName,
      email,
      password,
    });
    await canteen.save();
    console.log(`Added canteen: ${name}`);
  }
  
  async function studentCreate(username, email, collegeName, password) {
    const student = new Student({
      username,
      email,
      collegeName,
      password,
    });
    await student.save();
    console.log(`Added student: ${username}`);
  }
  
  async function createCanteens() {
    console.log('Adding canteens');
    await Promise.all([
      canteenCreate('Canteen 1', 'College A', 'canteen1@example.com', 'password1'),
      canteenCreate('Canteen 2', 'College B', 'canteen2@example.com', 'password2'),
      // Add more canteens as needed
    ]);
  }
  
  async function createStudents() {
    console.log('Adding students');
    await Promise.all([
      studentCreate('Student 1', 'student1@example.com', 'College A', 'password1'),
      studentCreate('Student 2', 'student2@example.com', 'College B', 'password2'),
      // Add more students as needed
    ]);
  }
  
  async function breakfastCreate(canteen, dishName) {
    const breakfast = new Breakfast({
      canteen,
      dishName,
    });
    await breakfast.save();
    console.log(`Added breakfast dish: ${dishName}`);
  }
  
  async function lunchCreate(canteen, dishName) {
    const lunch = new Lunch({
      canteen,
      dishName,
    });
    await lunch.save();
    console.log(`Added lunch dish: ${dishName}`);
  }
  
  async function dinnerCreate(canteen, dishName) {
    const dinner = new Dinner({
      canteen,
      dishName,
    });
    await dinner.save();
    console.log(`Added dinner dish: ${dishName}`);
  }
  
  async function createBreakfasts() {
    console.log('Adding breakfast dishes');
    const canteen1 = await Canteen.findOne({ name: 'Canteen 1' });
    const canteen2 = await Canteen.findOne({ name: 'Canteen 2' });
  
    await Promise.all([
      breakfastCreate(canteen1._id, 'Pancakes'),
      breakfastCreate(canteen1._id, 'Omelette'),
      breakfastCreate(canteen2._id, 'French Toast'),
      breakfastCreate(canteen2._id, 'Waffles'),
    ]);
  }
  
  async function createLunches() {
    console.log('Adding lunch dishes');
    const canteen1 = await Canteen.findOne({ name: 'Canteen 1' });
    const canteen2 = await Canteen.findOne({ name: 'Canteen 2' });
  
    await Promise.all([
      lunchCreate(canteen1._id, 'Burger'),
      lunchCreate(canteen1._id, 'Pizza'),
      lunchCreate(canteen2._id, 'Sandwich'),
      lunchCreate(canteen2._id, 'Salad'),
    ]);
  }
  
  async function createDinners() {
    console.log('Adding dinner dishes');
    const canteen1 = await Canteen.findOne({ name: 'Canteen 1' });
    const canteen2 = await Canteen.findOne({ name: 'Canteen 2' });
  
    await Promise.all([
      dinnerCreate(canteen1._id, 'Spaghetti'),
      dinnerCreate(canteen1._id, 'Steak'),
      dinnerCreate(canteen2._id, 'Sushi'),
      dinnerCreate(canteen2._id, 'Chicken Curry'),
    ]);
  }