const User = require('../models/user');

exports.addUser = (req, res) => {
  const user = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password,
    teacher: true,
  });

  if (req.body.teacherCode === process.env.TEACHER_CODE) {
    user.save().then(() => {
      res.status(201).json(user.sanitize());
    }).catch((error) => {
      if (error.name === 'ValidationError') {
        const emailError = error.errors.email ? error.errors.email.message : null;
        const passwordError = error.errors.password ? error.errors.password.message : null;
        res.status(422).json({
          errors: {
            email: emailError,
            password: passwordError,
          },
        });
      } else {
        res.sendStatus(500);
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid teacher code' });
  }
};
