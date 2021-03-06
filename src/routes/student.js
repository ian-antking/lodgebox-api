const express = require('express');
const studentController = require('../controllers/student');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, studentController.newStudent);
router.get('/', studentController.getStudents);
router.put('/:id', auth, studentController.updateStudent);
router.delete('/:id', auth, studentController.deleteStudent);
module.exports = router;
