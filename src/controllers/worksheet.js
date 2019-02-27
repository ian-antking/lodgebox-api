const Worksheet = require('../models/worksheets');

exports.createWorksheet = (req, res) => {
  const worksheet = new Worksheet({
    title: req.body.title,
    subject: req.body.subject,
    description: req.body.description,
    uri: null,
    teacher: null,
  });

  res.status(201).json(worksheet);
};
