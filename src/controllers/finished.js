const Finished = require('../models/worksheets');
// const Minio = require('minio');

exports.createFinished = (req, res) => {
  const fileData = JSON.parse(req.body.fileData);
  const finished = new Finished({
    title: fileData.title,
    uri: `${process.env.MINIO_SERVER}:${process.env.MINIO_PORT}/${process.env.MINIO_WORKSHEET_BUCKET}/${req.file.originalname}`,
    student: null,
    teacher: null,
  });

  res.status(201).json(finished);
};
