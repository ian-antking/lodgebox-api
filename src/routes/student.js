const express = require('express');
const studentController = require('../controllers/student');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, studentController.newStudent);
router.get('/', auth, studentController.getStudents);
router.delete('/:id', auth, studentController.deleteStudent);

module.exports = router;
