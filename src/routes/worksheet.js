const express = require('express');
const worksheetController = require('../controllers/worksheet.js');

const router = express.Router();

router.post('/', worksheetController.createWorksheet);

module.exports = router;
