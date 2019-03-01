const faker = require('faker');

const subjects = ['english', 'maths', 'science', 'ict'];

exports.user = (options = {}) => ({
  name: options.name || faker.name.findName(),
  email: options.email || faker.internet.email(),
  password: options.password || faker.internet.password(),
  teacherCode: options.teacherCode || 'teacherCode',
});

exports.student = (options = {}) => ({
  name: options.name || faker.name.firstName(),
  ip: options.ip || String(faker.random.number()),
});

exports.worksheet = (options = {}) => ({
  title: options.title || faker.random.words(),
  subject: options.subject || subjects[Math.floor(Math.random() * 3)],
  description: options.description || faker.random.words(),
});
