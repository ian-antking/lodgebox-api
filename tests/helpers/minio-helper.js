/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Minio = require('minio');

exports.emptyBuckets = () => {
  const worksheetList = [];
  const finishedList = [];
  const fileStorage = new Minio.Client({
    endPoint: process.env.MINIO_SERVER,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS,
    secretKey: process.env.MINIO_SECRET,
  });
  const worksheetStream = fileStorage.listObjects(process.env.MINIO_WORKSHEET_BUCKET, '', true);
  const finishedStream = fileStorage.listObjects(process.env.MINIO_FINISHED_BUCKET, '', true);

  worksheetStream.on('data', (object) => {
    worksheetList.push(object.name);
  });

  finishedStream.on('data', (object) => {
    finishedList.push(object.name);
  });

  worksheetStream.on('end', () => {
    fileStorage.removeObjects(process.env.MINIO_WORKSHEET_BUCKET, worksheetList, (err) => {
      if (err) {
        return console.log('Unable to remove Objects from worksheet-test', err);
      }
      console.log('worksheets-test bucket emptied successfully');
    });
  });

  finishedStream.on('end', () => {
    fileStorage.removeObjects(process.env.MINIO_FINISHED_BUCKET, finishedList, (err) => {
      if (err) {
        return console.log('Unable to remove Objects from finished-test', err);
      }
      console.log('finished-test bucket emptied successfully');
    });
  });
};
