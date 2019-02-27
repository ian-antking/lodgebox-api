exports.upload = data => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/worksheet')
    .send(data)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
