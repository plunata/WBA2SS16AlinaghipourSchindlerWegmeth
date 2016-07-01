var requesthandler = require('../bin/requesthandler');


var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());


var key = 'task';
var parentKey = 'group';

router.post('/', function(req, res) {
    requesthandler.postParentCallback(req, res, key, parentKey);
});

router.get('/', function(req, res){
    requesthandler.findAll(req,res,key,'');
});

router.get('/:id', function(req, res){
    requesthandler.findById(req,res,key,'');
});

router.put('/:id', function(req,res) {
    requesthandler.update(req,res,key,'');
});

module.exports = router;
