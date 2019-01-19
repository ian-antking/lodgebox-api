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
