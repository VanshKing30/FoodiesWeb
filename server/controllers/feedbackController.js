const asyncHandler = require('express-async-handler');
const Feedback = require('../models/studentfeedback');
const { validationResult } = require('express-validator'); // For input validation
// Middleware for input validation (example using express-validator)
const validateFeedback = [
  check('message').notEmpty().withMessage('Message is required'),
  check('canteenId').notEmpty().withMessage('Canteen ID is required'),
  check('userId').notEmpty().withMessage('User ID is required')
];
const submitFeedback = asyncHandler(async (req, res) => {
  // Validate request inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { message, canteenId, userId } = req.body;
  try {
    const feedback = new Feedback({ message, canteenId, userId });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error); // Log the error for debugging
    res.status(500).json({ error: 'Server error, could not submit feedback' });
  }
});
module.exports = { submitFeedback, validateFeedback };
