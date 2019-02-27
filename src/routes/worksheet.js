const express = require('express');
const worksheetController = require('../controllers/worksheet.js');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, worksheetController.createWorksheet);

module.exports = router;
