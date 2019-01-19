const StudentHelper = require('./helpers/student-helper');
const DataFactory = require('./helpers/data-factory');
const UserHelper = require('./helpers/user-helpers');
const Student = require('../src/models/student');

let signUpData;
let token;
describe('/student', () => {
  beforeEach((done) => {
    signUpData = {
      user: DataFactory.user(),
      teacherCode: 'teacherCode',
    };
    UserHelper.signUp(signUpData)
      .then(() => {
        UserHelper.login(signUpData.user)
          .then((res) => {
            token = res.body.token;
            done();
          })
          .catch(error => done(error));
      })
      .catch(error => done(error));
  });
  describe('POST', () => {
    it('creates a new student', (done) => {
      const studentData = DataFactory.student();
      StudentHelper.newStudent(token, studentData)
        .then(res => {
          expect(res.status).to.equal(201);

          Student.countDocuments((_, count) => {
            expect(count).to.equal(1);
          });

          expect(res.body.name).to.equal(studentData.name);
          expect(res.body.ip).to.equal(studentData.ip);
          done();
        })
        .catch(error => done(error));
    });
    it('requires a name', (done) => {
      const studentData = DataFactory.student();
      delete studentData.name;
      StudentHelper.newStudent(token, studentData)
        .then(res => {
          expect(res.status).to.equal(422);
          expect(res.body.errors.name).to.equal('Name is required');
          done();
        })
        .catch(error => done(error));
    });
    it('requires an ip address', (done) => {
      const studentData = DataFactory.student();
      delete studentData.ip;
      StudentHelper.newStudent(token, studentData)
        .then(res => {
          expect(res.status).to.equal(422);
          expect(res.body.errors.ip).to.equal('ip address is required');
          done();
        })
        .catch(error => done(error));
    });
    it('only allows logged in users to create students', (done) => {
      const studentData = DataFactory.student();
      StudentHelper.newStudent(null, studentData)
        .then(res => {
          expect(res.status).to.equal(401);
          done();
        })
        .catch(error => done(error));
    });
  });
});
