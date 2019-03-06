const Fs = require('fs');
const faker = require('faker');

const file = `${__dirname}/test-file.txt`;

exports.upload = (credentials, data) => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/worksheet')
    .set('Authorizer', credentials)
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

exports.manyWorksheets = (credentials, worksheets) => new Promise((resolve, reject) => {
  worksheets.forEach(worksheet => {
    chai.request(server)
      .post('/worksheet')
      .set('Authorizer', credentials)
      .attach('file', Fs.readFileSync(file), faker.system.commonFileName())
      .field('fileData', JSON.stringify(worksheet))
      .end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
  });
});

exports.getWorksheets = (data) => new Promise((resolve, reject) => {
  chai.request(server)
    .get('/worksheet')
    .send(data)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});

exports.deleteWorksheet = (credentials, id) => new Promise((resolve, reject) => {
  chai.request(server)
    .delete(`/worksheet/${id}`)
    .set('Authorizer', credentials)
    .send()
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
