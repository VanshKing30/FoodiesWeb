const asyncHandler = require('express-async-handler');
const Feedback = require('../models/studentfeedback');

const submitFeedback = asyncHandler(async (req, res) => {
  const { message, canteenId, userId } = req.body;

  if (!message || !canteenId || !userId) {
    res.status(400);
    throw new Error('Message, Canteen ID, and User ID are required');
  }

  try {
    const feedback = new Feedback({ message, canteenId, userId });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500);
    throw new Error('Server error, could not submit feedback');
  }
});

module.exports = { submitFeedback };
