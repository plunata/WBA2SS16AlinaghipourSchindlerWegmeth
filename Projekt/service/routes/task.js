var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

router.post('/', function(req,res) {
 //todo: task anlegen
});

router.get('/', function(req, res) {
  //todo: alle task ausgeben
});

router.get('/:id', function(req, res){
  //todo: bestimmten task anzeigen
});

router.put('/:id', function(req,res) {
  //todo: vorhandenen Task ändern
});

router.delete('/:id', function(req, res) {
  //todo: task löschen
});
module.exports = router;