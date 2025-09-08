// middleware/errorHandler.js

// Express error-handling middleware must have 4 parameters
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // log the full error

  res.status(500).json({
    message: "Something went wrong on the server",
    error: err.message // optional: show error message
  });
};

module.exports = errorHandler;
