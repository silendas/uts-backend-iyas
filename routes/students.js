const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const studentController = require('../controllers/studentController');

// Validation for create student
const createStudentValidation = [
  body('npm').notEmpty().withMessage('NPM is required')
    .isLength({ min: 8, max: 8 }).withMessage('NPM must be 8 characters'),
  body('name').notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  body('class').notEmpty().withMessage('Class is required'),
];

// Validation for update student
const updateStudentValidation = [
  body('name').optional().isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  body('class').optional().notEmpty().withMessage('Class cannot be empty'),
];

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes with controller
router.post('/', createStudentValidation, validate, studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:npm', studentController.getStudentByNpm);
router.put('/:npm', updateStudentValidation, validate, studentController.updateStudent);
router.delete('/:npm', studentController.deleteStudent);

module.exports = router; 