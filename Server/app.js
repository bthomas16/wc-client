const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const passport = require('passport');

const app = express();
const UserController = require('./controllers/user');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api/user', UserController);

app.use(passport.initialize());
app.use(passport.session());


app.listen(8080, ()=> {
  console.log('listening on port 8080')
})