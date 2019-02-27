const Worksheet = require('../models/worksheets');

exports.createWorksheet = (req, res) => {
  const worksheet = new Worksheet({
    title: req.body.title,
    subject: req.body.subject,
    description: req.body.description,
    uri: null,
    teacher: req.authorizer._id,
  });

  worksheet.save().then(() => {
    res.status(201).json(worksheet.toObject());
  }).catch(error => {
    if (error.name === 'ValidationError') {
      const titleError = error.errors.title ? error.errors.title.message : null;
      const subjectError = error.errors.subject ? error.errors.subject.message : null;
      const descriptionError = error.errors.description ? error.errors.description.message : null;
      res.status(422).json({
        errors: {
          title: titleError,
          subject: subjectError,
          description: descriptionError,
        },
      });
    } else {
      res.sendStatus(500);
    }
  });
};
