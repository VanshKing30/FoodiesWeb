const asyncHandler = require('express-async-handler');
const Feedback = require("../models/studentfeeback");

const getFeedbacksByCanteen = asyncHandler(async (req, res) => {
  const { canteenId } = req.params;

  if (!canteenId) {
    res.status(400);
    throw new Error('Canteen ID is required');
  }

  const feedbacks = await Feedback.find({ canteenId });

  res.status(200).json(feedbacks);
});


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


module.exports = { submitFeedback ,getFeedbacksByCanteen };

