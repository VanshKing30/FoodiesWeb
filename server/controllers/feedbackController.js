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
  const { message, canteenId ,userId} = req.body;


  if (!message || !canteenId) {
    res.status(400);
    throw new Error('Message and Canteen ID are required');
  }

  const feedback = new Feedback({ message, canteenId, userId });
  await feedback.save();
  res.status(201).json({ message: 'Feedback submitted successfully' });
});

module.exports = { submitFeedback ,getFeedbacksByCanteen };