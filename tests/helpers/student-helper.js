exports.newStudent = (credentials, student) => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/student')
    .set('Authorizer', credentials)
    .send(student)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});

exports.manyStudents = (credentials, students) => new Promise((resolve, reject) => {
  students.forEach(student => {
    chai.request(server)
      .post('/student')
      .set('Authorizer', credentials)
      .send(student)
      .end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
  });
});

exports.getStudents = (data) => new Promise((resolve, reject) => {
  chai.request(server)
    .get('/student')
    .send(data)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});

exports.updateStudent = (credentials, data) => new Promise((resolve, reject) => {
  chai.request(server)
    .patch(`/student/${data._id}`)
    .set('Authorizer', credentials)
    .send(data)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
