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

exports.getStudents = (id) => new Promise((resolve, reject) => {
  chai.request(server)
    .get(`/student?${id}`)
    .send()
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
