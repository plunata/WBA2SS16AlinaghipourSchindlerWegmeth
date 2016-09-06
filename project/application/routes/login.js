var express = require ('express');
var cookieParser = require('cookie-parser');
var request = require('request');
var router = express.Router ();

var app = express ();
var http = require ('http');
var service = require ('../bin/serviceConnector');

router.get ('/', function (req, res, next) {
    if(req.userData.user){
        res.redirect("/dashboard");
        res.end;
        return;
    }

    res.render ('login', {title:  "login"});
    res.end();
});

router.post ('/', function (req, res) {
    if(req.userData.user){
        var uData = JSON.parse(req.userData.user);
        res.status(202);
        res.send(JSON.stringify(uData.id));
    }


});

module.exports = router;
