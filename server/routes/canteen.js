const express = require('express');
const router = express.Router();

// Import canteen controller functions
const canteenController = require('../controllers/canteenController');

router.get('/getcanteen' , canteenController.getAllCanteen);

//yeh mere routes
router.get('/:id/breakfast' , canteenController.getBreakfast);

router.get('/:id/lunch' , canteenController.getLunch);

router.get('/:id/dinner' , canteenController.getDinner);

//mere routes ki ending

// Route for the canteen dashboard of a specific canteen
// router.get('/:id', canteenController.getCanteenDashboard);

// Route to add a breakfast dish for a specific canteen
router.post('/:id/breakfast/add', canteenController.addBreakfastDish);

// Route to remove a breakfast dish for a specific canteen
router.delete('/:id/breakfast/remove', canteenController.removeBreakfastDish);

// Route to add a lunch dish for a specific canteen
router.post('/:id/lunch/add', canteenController.addLunchDish);

// Route to remove a lunch dish for a specific canteen
router.delete('/:id/lunch/remove', canteenController.removeLunchDish);

// Route to add a dinner dish for a specific canteen
router.post('/:id/dinner/add', canteenController.addDinnerDish);

// Route to remove a dinner dish for a specific canteen
router.delete('/:id/dinner/remove', canteenController.removeDinnerDish);

module.exports = router;
