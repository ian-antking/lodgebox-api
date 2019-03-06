const mongoose = require('mongoose');

const finishedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  uri: String,
  student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],
  teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacher' }],
});

const Finished = mongoose.model('finished', finishedSchema);

module.exports = Finished;
