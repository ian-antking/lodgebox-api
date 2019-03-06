const DataFactory = require('./helpers/data-factory');
const StudentHelper = require('./helpers/student-helper');
const UserHelper = require('./helpers/user-helpers');
const FinishedHelper = require('./helpers/finished-helper');
const Finished = require('../src/models/finished');

describe('/finished', () => {
  let token;
  let teacherData;
  let studentData;
  let student;
  let finishedWorkData;
  beforeEach(done => {
    finishedWorkData = DataFactory.worksheet();
    studentData = DataFactory.student({ ip: '10.0.9.13' });
    teacherData = DataFactory.user();
    UserHelper.signUp(teacherData)
      .then(() => {
        UserHelper.login(teacherData)
          .then(res => {
            token = res.body.token;
            StudentHelper.newStudent(token, studentData)
              .then(studentRes => {
                student = studentRes.body;
                done();
              })
              .catch(error => done(error));
          })
          .catch(error => done(error));
      })
      .catch(error => done(error));
  });
  describe('POST', () => {
    it('creates new finished object', (done) => {
      FinishedHelper.upload(student.ip, finishedWorkData)
        .then(res => {
          expect(res.status).to.equal(201);
          Finished.countDocuments((_, count) => {
            expect(count).to.equal(1);
            done();
          });
        })
        .catch(error => done(error));
    });
  });
});
