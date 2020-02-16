const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

const users = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'super secret string', resave: false, saveUninitialized: false }));

app.get('/login', (req, res, next) => {
  if(req.session.isLoggedIn) return res.send('You\'re ALREADY logged in!');

  req.session.isLoggedIn = true;
  res.send('You\'re NOW logged in!');
});

app.get('/logout', (req, res, next) => {
  if(!req.session.isLoggedIn) return res.send('You\'re ALREADY logged out!');

  req.session.isLoggedIn = false;
  res.send('You\'re NOW logged out!');
});

app.get('/', (req, res, next) => {
  if(req.session.isLoggedIn) {
    res.send('You\'re logged in!');
  } else {
    res.send('You\'re NOT logged in!');
  }
});

app.listen(3000);
