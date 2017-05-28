require('dotenv').config({
  silent: true
});
var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var bodyParser = require('body-parser');
var session = require('client-sessions');
var config = require('./config');
var home = require('./app/routes/home');
var polls = require('./app/routes/polls');
var myPolls = require('./app/routes/mypolls');
var createPoll = require('./app/routes/createpoll');
var signUp = require('./app/routes/signup');
var authCallack = require('./app/routes/callback');
var login = require('./app/routes/login');
var logout = require('./app/routes/logout');
var app = express();

process.env.NODE_ENV = 'production';

mongoose.connect(config.database);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Connection to the database successful');
}) 

//View engine
app.set('view engine', 'ejs');

//Local Authentication.
app.use(express.static('public'));
app.use(session({
  cookieName: 'session',
  secret: process.env.secret,
  duration: 30 * 60 * 1000,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/', home);
app.use('/polls', polls);
app.use('/createpoll', createPoll);
app.use('/mypolls',myPolls);
app.use('/signup', signUp);
app.use('/callback',authCallack);
app.use('/login', login);
app.use('/logout', logout);

// Listen for connections on the specfied port and run a callback
app.listen(config.port, function() {
    // Print message describing what port Node.js is listening on
    console.log("Node.js listening on " + config.port);
});

module.exports = app; 
