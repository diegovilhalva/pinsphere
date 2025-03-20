import { body, validationResult } from 'express-validator';

export const validateUser = [
  body('displayName')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
    .escape(),

  body('username')
    .trim()
    .toLowerCase()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
    .matches(/^[a-z0-9_]+$/).withMessage('Username can only contain letters, numbers and underscores')
    .escape(),

  body('email')
    .normalizeEmail()
    .isEmail().withMessage('Invalid email address'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];


export const validateLogin = [
  body('identifier') // Pode ser email ou username
    .trim()
    .notEmpty().withMessage('Email or username is required'),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];