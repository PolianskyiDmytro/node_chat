class ApiError extends Error {
  constructor({ message, errorStatus, errors = [] }) {
    super(message);

    this.status = errorStatus;
    this.errors = errors;
  }

  static badRequest(message, errors) {
    return new ApiError({
      message,
      errors,
      status: 400,
    });
  }

  static unauthorized(errors) {
    return new ApiError({
      message: 'Unauthorized User',
      errors,
      status: 401,
    });
  }

  static notFound(errors) {
    return new ApiError({
      message: 'Not Found',
      errors,
      status: 404,
    });
  }
}

module.exports = {
  ApiError,
};
