const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (_, user) => {
    if (user !== null && user.validatePassword(req.body.password)) {
      jwt.sign(user.sanitize(), process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
        res.status(200).json({ token });
      });
    } else {
      res.status(401).send();
    }
  });
};
