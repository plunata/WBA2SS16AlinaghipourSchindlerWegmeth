var express = require('express');
var http = require('http');
var service = require('../bin/serviceConnector');
var router = express.Router();
var service = require('../bin/serviceConnector');
var request = require ('request');


/* GET home page. */
router.get('/', function (req, res, next) {
});

router.post('/', function (req, res, next) {

    callback = function (data) {
        res.send("data");

        var io = req.app.get ('socketio');
        io.to("3").emit('messages', {'message': '123 '});

    }

    service.sendPost('/task', JSON.stringify(req.body), callback);
});

module.exports = router;

