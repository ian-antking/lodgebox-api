const DataFactory = require('./helpers/data-factory');
const StudentHelper = require('./helpers/student-helper');
const UserHelper = require('./helpers/user-helpers');

describe('/finished', () => {
  let token;
  let teacherData;
  let studentData;
  let teacher;
  let student;
  let finishedWorkData;
  beforeEach(done => {
    finishedWorkData = DataFactory.worksheet();
    studentData = DataFactory.student({ ip: '10.0.9.13' });
    teacherData = DataFactory.user();
    UserHelper.signUp(teacherData)
      .then(signUpRes => {
        teacher = signUpRes.body;
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
      
      done();
    });
  });
});
