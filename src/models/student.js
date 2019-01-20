const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  ip: {
    type: String,
    required: [true, 'ip address is required'],
  },
  teacher: {
    type: Boolean,
    required: true,
  },
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
