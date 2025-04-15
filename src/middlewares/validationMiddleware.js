import { body } from 'express-validator';

export const validateAuthInput = [
  body('email')
    .isEmail().withMessage('Invalid email format')
    .notEmpty().withMessage('Email is required')
    .normalizeEmail(),
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required'),
  body('age')
    .isInt({ min: 0 }).withMessage('Age must be a non-negative integer')
    .notEmpty().withMessage('Age is required'),
  body('phone')
    .matches(/^\d{1,15}$/).withMessage('Phone must be a numeric string of up to 15 digits')
    .notEmpty().withMessage('Phone is required'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .notEmpty().withMessage('Password is required'),
  body('region')
    .isString().withMessage('Region must be a string')
    .notEmpty().withMessage('Region is required'),
];

export const validateLoginInput = [
  body('email')
    .isEmail().withMessage('Invalid email format')
    .notEmpty().withMessage('Email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .notEmpty().withMessage('Password is required'),
];

export const validatePasswordChangeInput = [
  body('currentPassword')
      .isLength({ min: 6 })
      .withMessage('Current password must be at least 6 characters long.'),
  body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long.'),
];

export const validateFindUserId = [
  body('userName')
    .isString().withMessage('User name must be a string')
    .notEmpty().withMessage('User name is required'),
  body('userPhone')
    .matches(/^\d{1,15}$/).withMessage('User phone must be a numeric string of up to 15 digits')
    .notEmpty().withMessage('User phone is required'),
];

export const validateVerifyUser = [
  body('email')
    .isEmail().withMessage('Invalid email format')
    .notEmpty().withMessage('Email is required')
    .normalizeEmail(),
  body('userName')
    .isString().withMessage('User name must be a string')
    .notEmpty().withMessage('User name is required'),
  body('userPhone')
    .matches(/^\d{1,15}$/).withMessage('User phone must be a numeric string of up to 15 digits')
    .notEmpty().withMessage('User phone is required'),
]

export const validateResetPassword = [
  body('newPassword')
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
    .notEmpty().withMessage('New password is required'),
];