exports.signUp = data => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/user')
    .send(data)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});

exports.manySignUp = (users) => new Promise((resolve, reject) => {
  users.forEach(user => {
    chai.request(server)
      .post('/user')
      .send(user)
      .end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
  });
});

exports.login = data => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/auth/login')
    .send({
      email: data.email,
      password: data.password,
    })
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});

exports.getUsers = () => new Promise((resolve, reject) => {
  chai.request(server)
    .get('/user')
    .send()
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
