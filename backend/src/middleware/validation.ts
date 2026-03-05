import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
    return;
  }
  next();
};

// Common validation rules
export const validateSymbol = [
  param('symbol')
    .isString()
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Symbol must be a string between 1 and 10 characters'),
  handleValidationErrors
];

export const validateSentimentAnalysis = [
  body('text')
    .isString()
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Text must be between 1 and 10000 characters'),
  body('symbol')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Symbol must be a string between 1 and 10 characters'),
  handleValidationErrors
];

export const validateNewsQuery = [
  query('symbol')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Symbol must be a string between 1 and 10 characters'),
  query('category')
    .optional()
    .isIn(['general', 'forex', 'crypto', 'merger'])
    .withMessage('Category must be one of: general, forex, crypto, merger'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];

export const validateStockData = [
  param('symbol')
    .isString()
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Symbol must be a string between 1 and 10 characters'),
  query('period')
    .optional()
    .isIn(['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y'])
    .withMessage('Period must be one of: 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y'),
  query('interval')
    .optional()
    .isIn(['1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1d', '5d', '1wk', '1mo', '3mo'])
    .withMessage('Invalid interval'),
  handleValidationErrors
];



export const validateWatchlist = [
  body('symbol')
    .isString()
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Symbol must be a string between 1 and 10 characters'),
  body('name')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  handleValidationErrors
];

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];