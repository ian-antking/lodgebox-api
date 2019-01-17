const mongoose = require('mongoose');
const app = require('./src/app');

const port = process.env.PORT || 4000;

mongoose.connect(process.env.DATABASE_CONN, { useNewUrlParser: true }, () => {
  // eslint-disable-next-line no-console
  console.log(`App runnig on 127.0.0.1:${port}`);
  app.listen(port);
});
