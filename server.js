const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();

const {DATABASE_URL, PORT} = require('./config');
const {router} = require('./router');
const {User, List, listItems} = require('./models');
const {listRouter} = require('./listrouter')

app.use(bodyParser.json());
app.use(express.static('public'));
exports.app = app;

app.use('/users', router);
app.use('/lists', listRouter);
app.use(express.static('public'));









function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};