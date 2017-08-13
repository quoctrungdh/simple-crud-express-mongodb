const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // TODO: send css js
  res.sendFile(path.resolve('build/index.html'));
});
module.exports = app;
