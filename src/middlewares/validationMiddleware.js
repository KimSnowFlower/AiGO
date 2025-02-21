const { body } = require('express-validator');

const validateAuthInput = [
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

const validateLoginInput = [
  body('phone')
    .matches(/^\d{1,15}$/).withMessage('Phone must be a numeric string of up to 15 digits')
    .notEmpty().withMessage('Phone is required'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .notEmpty().withMessage('Password is required'),
];

const validatePasswordChangeInput = [
  body('currentPassword')
      .isLength({ min: 6 })
      .withMessage('Current password must be at least 6 characters long.'),
  body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long.'),
];

module.exports = { validateAuthInput, validateLoginInput, validatePasswordChangeInput };