import { validationResult } from 'express-validator';
import { ApiError } from '../utils/api-error.js';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((error) => error.msg);
    return res
      .status(400)
      .json(new ApiError(400, 'Validation failed', messages));
  }
  next();
};
