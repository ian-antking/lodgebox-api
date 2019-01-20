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

exports.getStudents = (credentials, id) => new Promise((resolve, reject) => {
  chai.request(server)
    .get(id ? `/student?id=${id}` : '/student')
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

exports.deleteStudent = (credentials, id) => new Promise((resolve, reject) => {
  chai.request(server)
    .delete(`/student//${id}`)
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
