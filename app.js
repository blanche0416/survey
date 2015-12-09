
//register all the application's modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//additions for authentication
var session = require('express-session');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');

//connect to mongodb with mongoose
//mongoose.connect('mongodb://blanche0416:wi04ns16on@ds048368.mongolab.com:48368/blanche');
mongoose.connect('mongodb://blanche0416:wi04ns16on@ds048368.mongolab.com:48368/blanche');
//check connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', function (callback) {
    console.log('Connected to mongodb');
});

//route alias
var routes = require('./routes/index');
var users = require('./routes/users');
var survey = require('./routes/survey');


var app = express();

require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session setup
app.use(session({
  secret: 'someSecret',
  saveUninitialized: true,
  resave: true
}));

//part of passport configuration
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/survey', survey);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
