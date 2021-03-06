var express = require ('express');

var request = require ('request');
var path = require ('path');
var favicon = require ('serve-favicon');
var logger = require ('morgan');
var cookieParser = require ('cookie-parser');
var bodyParser = require ('body-parser');
var http = require ('http');
var session = require ('client-sessions');

var users = require ('./routes/registration');
var universities = require ('./routes/university');
var faculty = require('./routes/faculty');
var login = require ('./routes/login');
var dashboard = require ('./routes/dashboard');
var user = require ('./routes/user');
var course = require ('./routes/course');
var subject = require('./routes/subject');
var task = require('./routes/task');
var app = express ();

// view engine setup
app.set ('views', path.join (__dirname, 'views'));
app.set ('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use (logger ('dev'));
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: false}));
app.use (cookieParser ());
app.use (require ('less-middleware') (path.join (__dirname, 'public')));
app.use (express.static (path.join (__dirname, 'public')));

app.use (session ({
    cookieName: 'userData',
    secret: 'asdwegreg5z5ztrhtzj67k4h345ju5jqw6jw',
}));

app.get ('/logout', function (req, res, next) {
    res.clearCookie("userData");
    res.redirect ("/login");
});

app.post ('/login', function (req, res, next) {
    var loginData = req.body;

    request ('http://localhost:3000/user?email=' + loginData.email, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            var users = JSON.parse (body);
            users.forEach (function (user) {
                if (user.password == loginData.password) {
                    req.userData.user = JSON.stringify (user);
                    next ();
                    return true;
                }
            });

        }

    });
});

app.get ('/', function (req, res, next) {
    if (req.userData.user)
        res.redirect ("/dashboard");
    else
        res.redirect ("/login");
});

app.use ('/registration', users);
app.use ('/university', universities);
app.use ('/login', login);
app.use ('/dashboard', dashboard);
app.use ('/user', user);
app.use ('/faculty', faculty);
app.use ('/course', course);
app.use ('/subject', subject);
app.use ('/task', task);


// catch 404 and forward to error handler
app.use (function (req, res, next) {
    var err = new Error ('Not Found');
    err.status = 404;
    next (err);
});


app.use (function (err, req, res, next) {
    res.status (err.status || 500);
    res.render ('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;