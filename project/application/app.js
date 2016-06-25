var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/registration');
var universities = require('./routes/university');
/* var faculties = require('./routes/faculties');
var courses = require('./routes/courses');
var subjects = require('./routes/subjects');
var groups = require('./routes/groups');
*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/registration', users);
app.use('/university', universities);

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

// Kann gelöscht werden, wenn alternative Lösung gefunden wurde
app.post("/postuni", function(req, res) {
    var data = JSON.stringify(req.body);
    console.log(req.body);
    console.log(data);
    var options = {
        host: "localhost",
        port: 8888,
        path: "/user",
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(data)
        }
    };
    
    var externalRequest = http.request(options, function(res) {
        externalRequest.on("data", function(chunk) {
            console.log("body: " + chunk);
        });
    });
    externalRequest.write(data);
    externalRequest.end();
});


module.exports = app;
