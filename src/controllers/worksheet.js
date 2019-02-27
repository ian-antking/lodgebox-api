const Worksheet = require('../models/worksheet');

exports.createWorksheet = (req, res) => {
  const worksheet = new Worksheet({
  });

  res.status(200).json(worksheet);
};
