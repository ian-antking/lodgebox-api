const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('isemail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [isEmail.validate, 'Invalid email address'],
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters long'],
  },
});

userSchema.pre('save', function encryptPassword(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    // eslint-disable-next-line consistent-return
    bcrypt.hash(this.password, 10, (error, hash) => {
      if (error) {
        next(error);
      } else {
        this.password = hash;
        return next();
      }
    });
  }
});

userSchema.methods.sanitize = function sanitize() {
  const { password, ...rest } = this.toObject();
  return rest;
};

userSchema.methods.validatePassword = function validatePassword(guess) {
  return bcrypt.compareSync(guess, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
