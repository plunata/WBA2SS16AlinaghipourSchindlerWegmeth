var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var redis = require('redis');
var logger = require('morgan');

var course = require('./routes/course');
var fakultaet = require('./routes/fakultaet');
var group = require('./routes/group');
var newsfeed = require('./routes/newsfeed');
var subject = require('./routes/subject');
var task = require('./routes/task');
var user = require('./routes/user');
var university = require('./routes/university');

var app = express();
app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/course', course);
app.use('/fakultaet', fakultaet);
app.use('/group', group);
app.use('/newsfeed', newsfeed);
app.use('/subject', subject);
app.use('/task', task);
app.use('/user', user);
app.use('/university', university);



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
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;