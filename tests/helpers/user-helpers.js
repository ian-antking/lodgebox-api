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
