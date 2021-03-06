const Worksheet = require('../models/worksheets');
const Minio = require('minio');

exports.createWorksheet = (req, res) => {
  const fileData = JSON.parse(req.body.fileData);
  const worksheet = new Worksheet({
    title: fileData.title,
    subject: fileData.subject,
    description: fileData.description,
    uri: `${process.env.MINIO_SERVER}:${process.env.MINIO_PORT}/${process.env.MINIO_WORKSHEET_BUCKET}/${req.file.originalname}`,
    teacher: req.authorizer._id,
  });

  const fileStorage = new Minio.Client({
    endPoint: process.env.MINIO_SERVER,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS,
    secretKey: process.env.MINIO_SECRET,
  });

  const worksheetBucket = process.env.MINIO_WORKSHEET_BUCKET;

  fileStorage.putObject(worksheetBucket, req.file.originalname, req.file.buffer, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      worksheet.save().then(() => {
        res.status(201).json(worksheet.toObject());
      }).catch(error => {
        if (error.name === 'ValidationError') {
          const titleError = error.errors.title ? error.errors.title.message : null;
          const subjectError = error.errors.subject ? error.errors.subject.message : null;
          const descError = error.errors.description ? error.errors.description.message : null;
          res.status(422).json({
            errors: {
              title: titleError,
              subject: subjectError,
              description: descError,
            },
          });
        } else {
          res.sendStatus(500);
        }
      });
    }
  });
};

exports.getWorksheets = (_, res) => {
  Worksheet.find({}, (err, worksheets) => {
    if (err) {
      res.status(500).json({ error: err });
    }
    res.status(200).json({ worksheets: worksheets });
  });
};

exports.deleteWorksheet = (req, res) => {
  Worksheet.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send();
    }
  });
};
