const Fs = require('fs');

const file = `${__dirname}/test-file.txt`;

exports.upload = (credentials, data) => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/worksheet')
    .set('Authorizer', credentials)
    .attach('file', Fs.readFileSync(file), `test${Math.round(Math.random() * 1000)}.txt`)
    .field('fileData', JSON.stringify(data))
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
