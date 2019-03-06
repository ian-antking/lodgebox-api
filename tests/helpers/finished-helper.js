const Fs = require('fs');
const faker = require('faker');

const file = `${__dirname}/test-file.txt`;

exports.upload = (ip, data) => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/finished')
    .set('x-forwarded-for', ip)
    .attach('file', Fs.readFileSync(file), faker.system.commonFileName())
    .field('fileData', JSON.stringify(data))
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
