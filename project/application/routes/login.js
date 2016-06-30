var express = require ('express');
var cookieParser = require('cookie-parser');
var request = require('request');
var router = express.Router ();

var app = express ();
var http = require ('http');
var service = require ('../bin/serviceConnector');

router.get ('/', function (req, res, next) {
    res.render ('login', {title:  "login"});
    res.end();
});

router.post ('/', function (req, res) {
    var reqData = req.body;
    var users = [];
    res.redirect("/dashboard");

});

module.exports = router;
