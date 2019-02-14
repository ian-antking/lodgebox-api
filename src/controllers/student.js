const Student = require('../models/student');

exports.newStudent = (req, res) => {
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

exports.getStudents = (_, res) => {
  Student.find({}, (__, students) => {
    res.status(200).json(students);
  });
};

exports.updateStudent = (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, student) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(student);
    }
  });
};

exports.deleteStudent = (req, res) => {
  Student.deleteOne({ _id: req.params.id }, () => {
    res.status(200).send();
  });
};
