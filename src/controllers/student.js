const Student = require('../models/student');

exports.newStudent = (req, res) => {
  const student = new Student({
    name: req.body.name,
    ip: req.body.ip,
    teacher: false,
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

exports.getStudents = (req, res) => {
  Student.find(req.query.id ? { _id: req.query.id } : {}, (_, students) => {
    res.status(200).json(students);
  });
};

exports.deleteStudent = (req, res) => {
  Student.findOneAndDelete({ id: req.param._id }, () => {
    res.status(204).send();
  }).catch(err => {
    res.status(500).json(err);
  });
};
