const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const studentController = require('../controllers/studentController');

// Validasi untuk create student
const createStudentValidation = [
  body('npm').notEmpty().withMessage('NPM wajib diisi')
    .isLength({ min: 8, max: 8 }).withMessage('NPM harus 8 karakter'),
  body('name').notEmpty().withMessage('Nama wajib diisi')
    .isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),
  body('class').notEmpty().withMessage('Kelas wajib diisi'),
];

// Validasi untuk update student
const updateStudentValidation = [
  body('name').optional().isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),
  body('class').optional().notEmpty().withMessage('Kelas tidak boleh kosong'),
];

// Middleware untuk mengecek hasil validasi
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes dengan controller
router.post('/', createStudentValidation, validate, studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:npm', studentController.getStudentByNpm);
router.put('/:npm', updateStudentValidation, validate, studentController.updateStudent);
router.delete('/:npm', studentController.deleteStudent);

module.exports = router; 