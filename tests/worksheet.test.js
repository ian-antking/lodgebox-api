const DataFactory = require('./helpers/data-factory');
const WorksheetHelper = require('./helpers/worksheet-helper');

describe('/worksheet', () => {
  let worksheet;
  beforeEach(done => {
    worksheet = DataFactory.worksheet();
    done();
  });
  describe('POST', () => {
    it('creates a new worksheet', (done) => {
      WorksheetHelper.upload(worksheet)
        .then(res => {
          expect(res.status).to.equal(201);
          done();
        })
        .catch(error => done(error));
    });
  });
});
