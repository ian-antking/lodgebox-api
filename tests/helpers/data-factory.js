const faker = require('faker');

exports.user = (options = {}) => ({
  name: options.name || faker.name.findName(),
  email: options.email || faker.internet.email(),
  password: options.password || faker.internet.password(),
});

exports.student = (options = {}) => ({
  name: options.name || faker.name.firstName(),
  ip: options.ip || faker.random.word(),
});
