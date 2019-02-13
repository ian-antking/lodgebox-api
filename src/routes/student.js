const express = require('express');
const studentController = require('../controllers/student');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, studentController.newStudent);
router.get('/', studentController.getStudents);

module.exports = router;