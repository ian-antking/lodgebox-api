const UserHelpers = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');
const jwt = require('jsonwebtoken');

describe('/auth', () => {
  let userData;
  beforeEach((done) => {
    userData = {
      user: DataFactory.user(),
      teacherCode: 'teacherCode',
    };
    UserHelpers.signUp(userData).then(() => {
      done();
    });
  });
  describe('POST', () => {
    describe('/auth/login', () => {
      it('issues a web token', (done) => {
        UserHelpers.login(userData.user)
          .then(res => {
            expect(res.status).to.equal(200);
            const token = jwt.decode(res.body.token);
            expect(token).to.have.property('_id');
            expect(token).to.have.property('name');
            expect(token).to.have.property('email');
            done();
          })
          .catch(error => done(error));
      });
      it('handles invalid authentication', (done) => {
        UserHelpers.login(DataFactory.user())
          .then(res => {
            expect(res.status).to.equal(401);
            done();
          })
          .catch(error => done(error));
      });
    });
  });
});
