const express = require('express');
const router = express.Router();

// Import canteen controller functions
const canteenController = require('../controllers/canteenController');
const { auth, isCanteen } = require('../middlewares/auth');
const multerUploads = require('../middleware/multer.middleware');

router.get('/getcanteen' , canteenController.getAllCanteen);
router.post("/feedback", canteenController.feedback)
router.get("/reviews", canteenController.canteenFeedbackRender)
//yeh mere routes
router.get('/:id/breakfast' , canteenController.getBreakfast);

router.get('/:id/lunch' , canteenController.getLunch);

router.get('/:id/dinner' , canteenController.getDinner);

//mere routes ki ending

// Route for the canteen dashboard of a specific canteen
// router.get('/:id', canteenController.getCanteenDashboard);

// Route to add a breakfast dish for a specific canteen
router.post('/:id/breakfast/add',auth,isCanteen,multerUploads, canteenController.addBreakfastDish);

// Route to remove a breakfast dish for a specific canteen
router.delete('/:id/breakfast/remove',auth,isCanteen, canteenController.removeBreakfastDish);

// Route to add a lunch dish for a specific canteen
router.post('/:id/lunch/add',auth,isCanteen, canteenController.addLunchDish);

// Route to remove a lunch dish for a specific canteen
router.delete('/:id/lunch/remove',auth,isCanteen, canteenController.removeLunchDish);

// Route to add a dinner dish for a specific canteen
router.post('/:id/dinner/add',auth,isCanteen, canteenController.addDinnerDish);

// Route to remove a dinner dish for a specific canteen
router.delete('/:id/dinner/remove',auth,isCanteen, canteenController.removeDinnerDish);

//router to update profile
router.put('/:id/update', auth, isCanteen, multerUploads, canteenController.updateCanteen);

// New update routes
router.put('/:id/breakfast/updateitem',auth,isCanteen,multerUploads, canteenController.updateBreakfastDish);
router.put('/:id/lunch/updateitem',auth,isCanteen,multerUploads, canteenController.updateLunchDish);
router.put('/:id/dinner/updateitem',auth,isCanteen,multerUploads, canteenController.updateDinnerDish);

module.exports = router;
