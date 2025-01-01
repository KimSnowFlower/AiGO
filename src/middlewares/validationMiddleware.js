const { body } = require('express-validator');

exports.validateRegisterInput = [
  // name: 문자열, 필수 입력
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required'),

  // age: 양의 정수, 필수 입력
  body('age')
    .isInt({ min: 0 }).withMessage('Age must be a non-negative integer')
    .notEmpty().withMessage('Age is required'),

  // phone: 15자 이내, 필수 입력, 숫자 및 특수 문자(-) 허용
  body('phone')
    .matches(/^\d{1,15}$/).withMessage('Phone must be a numeric string of up to 15 digits')
    .notEmpty().withMessage('Phone is required'),

  // password: 최소 6자 이상, 필수 입력
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .notEmpty().withMessage('Password is required'),

  // region: 문자열, 필수 입력
  body('region')
    .isString().withMessage('Region must be a string')
    .notEmpty().withMessage('Region is required'),
];