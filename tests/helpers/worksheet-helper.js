exports.upload = (credentials, data)=> new Promise((resolve, reject) => {
  chai.request(server)
    .post('/worksheet')
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
