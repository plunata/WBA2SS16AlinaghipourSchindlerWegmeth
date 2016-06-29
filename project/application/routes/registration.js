var express = require('express');
var http = require('http');
var service = require('../bin/serviceConnector');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('registration', {title: 'Registrierung'});
});

router.post('/', function (req, res, next) {
    callback = function (data) {
        res.send("User erfolgreich anleglegt");
    }

    service.sendPost('/user', JSON.stringify(req.body), callback);
});

module.exports = router;
