var express = require('express');
var http = require('http');
var service = require('../bin/serviceConnector');
var router = express.Router();
var service = require('../bin/serviceConnector');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('installation/university', {title: 'Registrierung einer Hochschule'});
});


router.post('/', function (req, res, next) {
    callback = function (data) {
        res.send(data);
    }

    service.sendPost('/university', JSON.stringify(req.body), callback);
});

module.exports = router;

