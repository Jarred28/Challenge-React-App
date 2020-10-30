const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const connectDb = require('./src/connection');
const cors = require('cors');
const router = require('./src/routes/contact');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
// api router
app.use('/api/contacts', router);

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
