const StudentHelper = require('./helpers/student-helper');
const DataFactory = require('./helpers/data-factory');
const UserHelper = require('./helpers/user-helpers');
const Student = require('../src/models/student');

let signUpData;
let token;
describe('/student', () => {
  beforeEach((done) => {
    signUpData = DataFactory.user();
    UserHelper.signUp(signUpData)
      .then(() => {
        UserHelper.login(signUpData)
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
  describe('GET', () => {
    it('returns a list of students', done => {
      const studentsList = [];
      for (let i = 0; i < 10; i += 1) {
        studentsList.push(DataFactory.student());
      }
      StudentHelper.manyStudents(token, studentsList)
        .then(() => {
          Student.countDocuments((_, count) => {
            expect(count).to.equal(10);
          })
            .catch(error => done(error));
          StudentHelper.getStudents()
            .then(res => {
              expect(res.status).to.equal(200);
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
  });
  describe('PUT', () => {
    it('updates student name', (done) => {
      const studentData = DataFactory.student();
      StudentHelper.newStudent(token, studentData)
        .then(res => {
          const studentUpdate = {
            name: 'newName',
          };
          StudentHelper.updateStudent(token, res.body._id, studentUpdate)
            .then(response => {
              expect(response.status).to.equal(200);
              expect(response.body.name).to.equal('newName');
              done();
            })
            .catch(error => done(error));
        });
    });
    it('updates student ip', (done) => {
      const studentData = DataFactory.student();
      StudentHelper.newStudent(token, studentData)
        .then(res => {
          const studentUpdate = {
            ip: 'newIp',
          };
          StudentHelper.updateStudent(token, res.body._id, studentUpdate)
            .then(response => {
              expect(response.status).to.equal(200);
              expect(response.body.ip).to.equal('newIp');
              done();
            })
            .catch(error => done(error));
        });
    });
    it('updates multiple fields', (done) => {
      const studentData = DataFactory.student();
      StudentHelper.newStudent(token, studentData)
        .then(res => {
          const studentUpdate = {
            name: 'newName',
            ip: 'newIp',
          };
          StudentHelper.updateStudent(token, res.body._id, studentUpdate)
            .then(response => {
              expect(response.status).to.equal(200);
              expect(response.body.ip).to.equal('newIp');
              expect(response.body.name).to.equal('newName');
              done();
            })
            .catch(error => done(error));
        });
    });
    it('does not allow unauthorised updates', (done) => {
      const studentData = DataFactory.student();
      StudentHelper.newStudent(token, studentData)
        .then(res => {
          const studentUpdate = {
            name: 'newName',
            ip: 'newIp',
          };
          StudentHelper.updateStudent(null, res.body._id, studentUpdate)
            .then(response => {
              expect(response.status).to.equal(401);
              done();
            })
            .catch(error => done(error));
        });
    });
  });
  describe('DELETE', () => {
    it('deletes single student', (done) => {
      const studentData = DataFactory.student();
      StudentHelper.newStudent(token, studentData)
        .then(res => {
          StudentHelper.deleteStudent(token, res.body._id)
            .then(response => {
              expect(response.status).to.equal(200);
              done();
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
    it('does not allow unauthorised deletions', (done) => {
      const studentData = DataFactory.student();
      StudentHelper.newStudent(null, studentData)
        .then(res => {
          StudentHelper.deleteStudent(token, res.body._id)
            .then(response => {
              expect(response.status).to.equal(500);
              done();
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
  });
});
