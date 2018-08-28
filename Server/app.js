const express = require('express');
const bodyParser = require('body-parser');


const passport = require('passport');

const app = express();
const UserController = require('./controllers/UserController');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api/user', UserController);

app.use(passport.initialize());
app.use(passport.session());


app.listen(8081, ()=> {
  console.log('listening on port 8081')
})