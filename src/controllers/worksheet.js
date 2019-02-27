const Worksheet = require('../models/worksheets');

exports.createWorksheet = (req, res) => {
  const worksheet = new Worksheet({
  });

  res.status(201).json(worksheet);
};
