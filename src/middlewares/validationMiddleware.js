const {body } = require('express-validator');

exports.validateRegisterInput = [
    body('name').isString().withMessage('Name must be a string'),
    body('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
    body('studentId').isString().withMessage('Student ID must be a string'),
    body('department').isString().withMessage('Department must be a string'),
    body('username')
      .matches(/^[A-Za-z0-9@_\-~]+$/).withMessage('Username can only contain letters, numbers, and special characters (@, _, -, ~)')
      .notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ];