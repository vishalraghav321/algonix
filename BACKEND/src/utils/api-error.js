class ApiError extends Error {
  constructor(statusCode, message, errors = [message], stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const toApiError = (error, fallback = 'Internal server error') => {
  if (error instanceof ApiError) {
    return error;
  }

  return new ApiError(500, fallback);
};

export { ApiError, toApiError };
