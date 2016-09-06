var express = require('express');
var http = require('http');
var service = require('../bin/serviceConnector');
var router = express.Router();
var service = require('../bin/serviceConnector');
var request = require ('request');


/* GET home page. */
router.get('/', function (req, res, next) {
    request ('http://127.0.0.1:3000/university', function (error, response, body) {

        if (!error && response.statusCode == 200) {
            var uni = JSON.parse (body);
            res.render ('installation/subject', {title: 'Modul anlegen', university: uni});
        }

    });
});

router.post('/', function (req, res, next) {
    callback = function (data) {
        res.send("Modul erfolgreich angelegt");
    }

    service.sendPost('/subject', JSON.stringify(req.body), callback);
});

module.exports = router;

