// brauchen wir einen personal_task??? ist das nicht ein ganz normaler task der einem User zugeordnet ist?


var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

router.post('/', function(req,res) {
 //todo:
});

router.get('/', function(req, res) {
//todo:
});



router.get('/:id', function(req, res){
  //todo:
});

router.put('/:id', function(req,res) {
  //todo:
});

router.delete('/:id', function(req, res) {
//todo:
});
module.exports = router;