require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

const { MONGODB_URI } = process.env;
let db = null;
MongoClient.connect(MONGODB_URI, (err, database) => {
  if (err) {
    // TODO: handle this with better solution
    console.log(err);
  } else {
    db = database;
  }
});

app.get('/', (req, res) => {
  // TODO: send css js
  res.sendFile(path.resolve('build/index.html'));
});

app.get('/users', (req, res) => {
  db.collection('users').find().toArray((err, results) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.json(results.map(user => ({
        id: user._id,
        username: user.username,
      })));
    }
  });
});

app.post('/users', (req, res) => {
  db.collection('users').save(req.body, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else if (results.result.ok) {
      res.sendStatus(201);
    }
  });
});

module.exports = app;
