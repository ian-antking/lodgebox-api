const UserHelpers = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');
const User = require('../src/models/user');

describe('/user', () => {
  const userData = DataFactory.user();
  describe('POST', () => {
    it('Creates a new user', (done) => {
      UserHelpers.signUp(userData)
        .then(res => {
          expect(res.status).to.equal(201);
          expect(res.body.name).to.equal(userData.name);
          expect(res.body.email).to.equal(userData.email);
          expect(res.body).to.not.have.property('password');
          User.countDocuments((_, count) => {
            expect(count).to.equal(1);
          });
          done();
        })
        .catch(error => done(error));
    });
    it('Rejects attempts without valid teacherCode', (done) => {
      const fakeTeacher = DataFactory.user({
        teacherCode: 'notTheCode',
      });
      UserHelpers.signUp(fakeTeacher)
        .then(res => {
          expect(res.status).to.equal(401);
          done();
        })
        .catch(error => done(error));
    });
    it('requires a valid email', (done) => {
      const data = DataFactory.user({ email: 'mockEmail' });
      UserHelpers.signUp(data)
        .then(res => {
          expect(res.status).to.equal(422);
          expect(res.body.errors.email).to.equal('Invalid email address');
          User.countDocuments((err, count) => {
            expect(count).to.equal(0);
            done();
          });
        })
        .catch(error => done(error));
    });
    it('requires passwords to be 8 characters long', (done) => {
      const data = DataFactory.user({ password: 'pass' });
      UserHelpers.signUp(data)
        .then(res => {
          expect(res.status).to.equal(422);
          expect(res.body.errors.password).to.equal('Password must be at least 8 characters long');
          User.countDocuments((err, count) => {
            expect(count).to.equal(0);
            done();
          });
        })
        .catch(error => done(error));
    });
  });
  describe('GET', () => {
    it('returns a list of users', (done) => {
      const userList = [DataFactory.user(), DataFactory.user(), DataFactory.user()];
      UserHelpers.manySignUp(userList)
        .then(() => {
          UserHelpers.getUsers()
            .then(res => {
              expect(res.staus).to.equal(200);
              done();
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
  });
});
