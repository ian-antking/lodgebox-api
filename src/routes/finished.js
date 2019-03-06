const express = require('express');
const finishedController = require('../controllers/finished.js');
const multer = require('multer');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post('/', upload.single('file'), finishedController.createFinished);

module.exports = router;
