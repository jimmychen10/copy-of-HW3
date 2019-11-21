const express = require('express');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const client = redis.createClient();

const app = express();
app.use(cookieParser());
const port = 3001;

const { MongoClient, ObjectID } = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test101';
// Create a new MongoClient
const mClient = new MongoClient(url);

mClient.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Connected successfully to server");
  const db = mClient.db(dbName);

  app.get('/register', (req, res) => {
    db.collection('users')
      .save({
        username: req.query.username,
        password: req.query.password,
      })
      .then(() => {
        res.send('Registered');
      })
      .catch((e) => {
        res.send('Error');
      });
  });

  app.get('/list', (req, res) => {
    db.collection('notes')
      .find({})
      .toArray()
      .then((docs) => {
        res.send(docs);
      })
      .catch((e) => {
        res.send('Error');
      });
  });

  app.get('/updateall', (req, res) => {
    const updater = {
      $set: {
        tag: req.query.tag || 'demo tag',
      }
    };
    db.collection('notes')
      .updateMany({}, updater)
      .then((docs) => {
        res.send('Update ok');
      })
      .catch((e) => {
        res.send('Error');
      });
  });

  app.get('/update', (req, res) => {
    // /update?hello=brian&value=batman
    const updater = {
      $set: {
        notes: req.query.notes || '',
      }
    };
    db.collection('notes')
      // update vs findOneAndUpdate
      .findOneAndUpdate({
        _id: ObjectID.createFromHexString(req.query._id),
      }, updater)
      .then(() => {
        res.send('Update Ok');
      })
      .catch((e) => {
        res.send('Error');
      });
  });

  // saves new notes, or updates existing if _id is existing
  app.get('/save', (req, res) => {
    db.collection('notes')
      .save({
        _id: new ObjectID,
        notes: req.query.notes,
        // username: req.cookies.username
      })
      .then(() => {
        res.send('Save Ok');
      })
      .catch((e) => {
        res.send('Error');
      });
  });

  // deletes based on _id
  app.get('/delete', (req, res) => {
    db.collection('notes')
      .findOneAndDelete({
        _id: req.query._id,
      })
      .then(() => {
        res.send('Delete Ok');
      })
      .catch((e) => {
        res.send('Error');
      });
  });

  app.post('/register', (req, res) => {
    db.collection('users')
      .save({
        username: req.query.username,
        password: req.query.password,
      })
      .then(() => {
        res.send('Registered');
      })
      .catch((e) => {
        res.send('Error');
      });
  });

  });

  app.use((req, res, next) => { // this is middleware? This is where we'll do a validation check.
    console.log(req.cookies) // this shows the cookie user password on console.
    const body = { // send the body of the request as a post
      username: req.cookies.username,
      password: req.cookies.password,
    };
    const key = req.cookies.username + '_' + req.cookies.password;

    // REDIS IS RETURNING A STRING? Gets a boolean but returns a string.
    client.get(key, (err, cachedValue) => { // try to get key, returns error or cachedvalue.
      console.log(err);
      console.log('cachedvalue', cachedValue);

      if (cachedValue !== null) {
        console.log('cache hit');
        // if cache hit, then dont need to do anymore network request
        if (cachedValue === 'true') { // extra safety
          return next();
        } else {
          res.status(403);
          return res.send('You need access to this endpoint!');
        }

      } else {
        console.log('cache miss');

        // only doing a request / full look up if its not on redis.
        axios.post('http://localhost:3002/service2/', body) // server to server call requires whole url
          .then((res) => {
            if (res.data.valid) { // document is a global on the frontend.
              client.set(key, 'true', 'EX', 3000); // copy pasted this in for the redis? This value expires in 3000 seconds
              return next(); // if correct, let request go through.
            } else {
              client.set(key, false); // can do the true like this too.
              res.status(403);
              return res.send('You need access to this endpoint!');
            }
          })
          .catch(console.log);
      }
    });
  })

  app.get('/service1/*', (req, res) => {
    console.log(req.cookies)
    res.send("ads");

    client.incr('myCounter', (err, updatedValue) => {
      console.log('Hitting service', process.env.NODE_APP_INSTANCE);
      res.send(`Hello from instance: ${process.env.NODE_APP_INSTANCE}, ${updatedValue} Visits!!!`);
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))