const Finished = require('../models/finished');
const Minio = require('minio');

exports.createFinished = (req, res) => {
  const fileData = JSON.parse(req.body.fileData);
  const finished = new Finished({
    title: fileData.title,
    uri: `${process.env.MINIO_SERVER}:${process.env.MINIO_PORT}/${process.env.MINIO_WORKSHEET_BUCKET}/${req.file.originalname}`,
    student: null,
    teacher: req.params.id,
  });

  const fileStorage = new Minio.Client({
    endPoint: process.env.MINIO_SERVER,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS,
    secretKey: process.env.MINIO_SECRET,
  });

  const finishedBucket = process.env.MINIO_FINISHED_BUCKET;

  fileStorage.putObject(finishedBucket, req.file.originalname, req.file.buffer, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      finished.save().then(() => {
        res.status(201).json(finished.toObject());
      }).catch(error => {
        if (error.name === 'ValidationError') {
          const titleError = error.errors.title ? error.errors.title.message : null;
          res.status(422).json({
            errors: {
              title: titleError,
            },
          });
        } else {
          res.sendStatus(500);
        }
      });
    }
  });
};
