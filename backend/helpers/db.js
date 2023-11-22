const mongoose = require('mongoose');

mongoose
  .connect(process.env.CONN_STRING)
  .then(() => {
    console.log('DATABASE CONNECTED');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose