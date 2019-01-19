const Student = require('../models/student');

exports.newStudnet = (req, res) => {
  const student = new Student({
    name: req.body.name,
    ip: req.body.ip,
  });

  student.save().then(() => {
    res.status(201).send(student);
  }).catch(error => {
    if (error.name === 'ValidationError') {
      const nameError = error.errors.name ? error.errors.name.message : null;
      const ipError = error.errors.ip ? error.errors.ip.message : null;
      res.status(422).json({
        errors: {
          name: nameError,
          ip: ipError,
        },
      });
    } else {
      res.sendStatus(500);
    }
  });
};
