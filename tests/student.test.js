const StudentHelper = require('./helpers/student-helper');
const DataFactory = require('./helpers/data-factory');
const UserHelper = require('./helpers/user-helpers');
const Student = require('../src/models/student');

let signUpData;
let token;
let studentsList;
describe('/student', () => {
  beforeEach((done) => {
    studentsList = [];
    for (let i = 0; i < 10; i += 1) {
      studentsList.push(DataFactory.student());
    }
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
          expect(res.body.teacher).to.equal(false);
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
  describe('GET', () => {
    it('returns a list of students', done => {
      StudentHelper.manyStudents(token, studentsList)
        .then(() => {
          Student.countDocuments((_, count) => {
            expect(count).to.equal(10);
          })
            .catch(error => done(error));
          StudentHelper.getStudents(token)
            .then(res => {
              res.body.forEach(item => {
                const student = studentsList.find(element => {
                  return element.name === item.name;
                });
                expect(item.name).to.equal(student.name);
                expect(item.ip).to.equal(student.ip);
              });
              done();
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
    it('returns a specific student', (done) => {
      const StudentData = DataFactory.student();
      StudentHelper.manyStudents(token, studentsList).then(() => {
        StudentHelper.newStudent(token, StudentData)
          .then(student => {
            StudentHelper.getStudents(token, student.body._id)
              .then(res => {
                expect(res.body.length).to.equal(1);
                expect(res.body[0]._id).to.equal(student.body._id);
                done();
              })
              .catch(error => done(error));
          })
          .catch(error => done(error));
      });
    });
  });
  describe('DELETE', () => {
    it('deletes a student', (done) => {
      const studentData = DataFactory.student();
      StudentHelper.newStudent(token, studentData)
        .then(student => {
          StudentHelper.deleteStudent(token, student.body._id)
            .then(res => {
              expect(res.status).to.equal(204);
              done();
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
  });
  // describe('PATCH', () => {
  //   it('updates student name', (done) => {

  //   });
  // });
});
