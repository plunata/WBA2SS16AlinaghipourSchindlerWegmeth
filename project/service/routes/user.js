var requesthandler = require('../bin/requesthandler');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

var key = 'user';
var parentKey = '';
var childKey = '';

router.post('/', function(req, res) {
  requesthandler.postCallback(req, res, key, parentKey);
});

router.get('/', function(req, res) {
  requesthandler.findAll(req, res, key ,childKey)
});

router.get('/:id', function(req, res){
  requesthandler.findById(req, res, key,childKey)
});

router.put('/:id', function(req,res) {
  requesthandler.update(req, res, key, childKey)
});

router.delete('/:id', function(req, res) {
  res.status(501).type('text').send('löschen nicht möglich');
});
module.exports = router;