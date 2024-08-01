// errorHandlers.js

// General error handler
function generalErrorHandler(err, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    // Detailed error info for development
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Generic error message for production
    console.error(err.stack); // Still log error details for debugging purposes
    res.status(500).json({
      success: false,
      message: 'Something went wrong!'
    });
  }
}    

// 404 Not Found handler
function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: 'Resource not found'
  });
}

// Custom error handler for different types of errors
function customErrorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid input',
      details: err.details
    });
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access'
    });
  }
  // Pass any other errors to the general error handler
  next(err);
}

module.exports = {
  generalErrorHandler,
  notFoundHandler,
  customErrorHandler
};
