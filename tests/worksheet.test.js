const DataFactory = require('./helpers/data-factory');
const WorksheetHelper = require('./helpers/worksheet-helper');
const UserHelper = require('./helpers/user-helpers');
const Worksheet = require('../src/models/worksheets');


describe('/worksheet', () => {
  let worksheet;
  let token;
  let teacherData;
  let teacher;
  beforeEach(done => {
    worksheet = DataFactory.worksheet();
    teacherData = DataFactory.user();
    UserHelper.signUp(teacherData)
      .then(signUpRes => {
        teacher = signUpRes.body;
        UserHelper.login(teacherData)
          .then(res => {
            token = res.body.token;
            done();
          })
          .catch(error => done(error));
      })
      .catch(error => done(error));
  });
  describe('POST', () => {
    it('creates a new worksheet', (done) => {
      WorksheetHelper.upload(token, worksheet)
        .then(res => {
          Worksheet.countDocuments((_, count) => {
            expect(count).to.equal(1);
          });
          expect(res.status).to.equal(201);
          expect(res.body.title).to.equal(worksheet.title);
          expect(res.body.subject).to.equal(worksheet.subject);
          expect(res.body.description).to.equal(worksheet.description);
          done();
        })
        .catch(error => done(error));
    });
    it('does not allow unauthorised uploads', (done) => {
      WorksheetHelper.upload(null, worksheet)
        .then(res => {
          expect(res.status).to.equal(401);
          done();
        })
        .catch(error => done(error));
    });
    it('requires a title', (done) => {
      delete worksheet.title;
      WorksheetHelper.upload(token, worksheet)
        .then(res => {
          expect(res.status).to.equal(422);
          expect(res.body.errors.title).to.equal('title is required');
          done();
        })
        .catch(error => done(error));
    });
    it('requires a subject', (done) => {
      delete worksheet.subject;
      WorksheetHelper.upload(token, worksheet)
        .then(res => {
          expect(res.status).to.equal(422);
          expect(res.body.errors.subject).to.equal('subject is required');
          done();
        })
        .catch(error => done(error));
    });
    it('requires a description', (done) => {
      delete worksheet.description;
      WorksheetHelper.upload(token, worksheet)
        .then(res => {
          expect(res.status).to.equal(422);
          expect(res.body.errors.description).to.equal('description is required');
          done();
        })
        .catch(error => done(error));
    });
    it('is linked to user document', (done) => {
      WorksheetHelper.upload(token, worksheet)
        .then(res => {
          expect(res.body.teacher.toString()).to.equal(teacher._id);
          done();
        })
        .catch(error => done(error));
    });
  });
  describe('GET', () => {
    it('returns list of worksheets', (done) => {
      const worksheetList = [DataFactory.worksheet()];
      WorksheetHelper.manyWorksheets(token, worksheetList)
        .then(() => {
          WorksheetHelper.getWorksheets()
            .then(res => {
              expect(res.status).to.equal(200);
              expect(res.body.worksheets.length).to.equal(worksheetList.length);
              res.body.worksheets.forEach(item => {
                const student = worksheetList.find(element => {
                  return element.title === item.title;
                });
                expect(item.title).to.equal(student.title);
                expect(item.subject).to.equal(student.subject);
                expect(item.description).to.equal(student.description);
              });
              done();
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
  });
  describe('DELETE', () => {
    it('deletes single worksheet', (done) => {
      WorksheetHelper.upload(token, worksheet)
        .then(res => {
          WorksheetHelper.deleteWorksheet(token, res.body._id)
            .then(response => {
              expect(response.status).to.equal(200);
              WorksheetHelper.getWorksheets()
                .then(response2 => {
                  expect(response2.body.worksheets.length).to.equal(0);
                  done();
                })
                .catch(error => done(error));
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
    it('does not allow unauthorised deletions', (done) => {
      WorksheetHelper.upload(token, worksheet)
        .then(res => {
          WorksheetHelper.deleteWorksheet(null, res.body._id)
            .then(response => {
              expect(response.status).to.equal(401);
              done();
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
  });
});
