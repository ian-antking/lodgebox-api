const express = require('express');
const worksheetController = require('../controllers/worksheet.js');
const auth = require('../middleware/auth');

const router = express.Router();
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post('/', auth, upload.single('file'), worksheetController.createWorksheet);
router.get('/', worksheetController.getWorksheets);
router.delete('/:id', auth, worksheetController.deleteWorksheet);

module.exports = router;
