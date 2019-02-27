const DataFactory = require('./helpers/data-factory');
const WorksheetHelper = require('./helpers/worksheet-helper');
const UserHelper = require('./helpers/user-helpers');


describe('/worksheet', () => {
  let worksheet;
  let token;
  let teacher;
  beforeEach(done => {
    worksheet = DataFactory.worksheet();
    teacher = DataFactory.user();
    UserHelper.signUp(teacher)
      .then(() => {
        UserHelper.login(teacher)
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
  });
});
