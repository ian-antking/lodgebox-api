const mongoose = require('mongoose');

const worksheetSchema = new mongoose.Schema({
  title: String,
  subject: String,
  description: String,
  uri: String,
  teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacher' }],
});

const Worksheet = mongoose.model('worksheet', worksheetSchema);

module.exports = Worksheet;
