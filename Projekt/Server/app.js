var express = require('express');
var app = express();
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var course = require('./Routes/course');
var fakultaet = require('./Routes/fakultaet');
var group = require('./Routes/group');
var subject = require('./Routes/subject');
var newsfeed = require('./Routes/newsfeed');
var personal_task = require('./Routes/personal_task');
var pinboard = require('./Routes/pinboard');
var task = require('./Routes/task');
var user = require('./Routes/user');

router.use(bodyParser.json());

router.use('/course', course);
router.use('/fakultaet', fakultaet);
/*router.use('/group', group);
router.use('/subject', subject);
router.use('/newsfeed', newsfeed);
router.use('/personal_task', personal_task);
router.use('/pinboard', pinboard);
router.use('/task', task);*/
router.use('/user', user);

router.use(function(req, res, next) {
  var err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server listening at http://%s:%s", host, port);
});

module.exports = router;
