const mongoose = require('mongoose');

const worksheetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  subject: {
    type: String,
    required: [true, 'subject is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  uri: String,
  teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacher' }],
});

const Worksheet = mongoose.model('worksheet', worksheetSchema);

module.exports = Worksheet;
