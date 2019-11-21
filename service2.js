
const express = require('express');
const app = express();
app.use(express.json());

const port = 3002;

let counter = 0

const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test101';
// Create a new MongoClient
const mClient = new MongoClient(url);

// Use connect method to connect to the Server
mClient.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  const db = mClient.db(dbName);
  app.post('/service2/*', (req, res) => {
    counter++;
    console.log('count', counter);
    console.log(req.body);
    let valid = false;
    db.collection('users').findOne(
      {
        $and: [
          { username: req.body.username },
          { password: req.body.password }
        ]
      },
      (err, result) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        valid = true
        res.send({
          valid,
        });
      }
    );
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
