const express = require('express');
const bodyParser = require('body-parser');


const passport = require('passport');

const app = express();
const UserController = require('./controllers/UserController');
const WatchController = require('./controllers/WatchController');
// const CollectionController = require('./controllers/CollectionController');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Request-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/user', UserController);
app.use('/api/watch', WatchController);
// app.use('/api/collection', CollectionController);
app.use('/api/static-assets', express.static('public'));

app.use(passport.initialize());
app.use(passport.session());


app.listen(8081, ()=> {
  console.log('listening on port 8081')
})