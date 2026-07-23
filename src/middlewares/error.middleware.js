const { ApiError } = require('../exceptions/api.error');

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ApiError) {
    res.status(error.status).send({
      message: error.message,
      errors: error.errors,
    });
  }

  res.send({
    message: 'Server Error',
  });

  res.statusCode(500);
};

module.exports = {
  errorMiddleware,
};
