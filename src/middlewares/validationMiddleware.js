const { body } = require('express-validator');

// 회원가입 입력 검증
exports.validateAuthInput = [
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

// 인증 코드 요청 입력 검증
exports.validatePhoneInput = [
  body('phone')
    .matches(/^\d{1,15}$/).withMessage('Phone must be a numeric string of up to 15 digits')
    .notEmpty().withMessage('Phone is required'),
];