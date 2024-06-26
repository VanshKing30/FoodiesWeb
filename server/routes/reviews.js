const express = require('express');
const router = express.Router();
const { auth, studentAuth } = require('../middlewares/auth');
const Review = require('../models/review');

// POST /api/v1/reviews - Create a review
router.post('/reviews', auth, studentAuth, async (req, res) => {
  try {
    const { product_id, rating, review_text } = req.body;
    const user_id = req.user.id; // Assuming req.user contains the authenticated user's details

    const newReview = new Review({ user_id, product_id, rating, review_text });
    await newReview.save();

    res.status(201).json({ success: true, message: 'Review created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating review' });
  }
});

module.exports = router;
