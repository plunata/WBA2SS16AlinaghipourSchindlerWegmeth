var requesthandler = require('../bin/requesthandler');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

router.post('/', function(req, res) {
  requesthandler.postCallback(req, res, 'faculty', 'university');
});

router.get('/', function(req, res) {
  console.log("Gib alle existierenden Fakultaeten aus...");
  client.keys('faculty:*', function(err, rep) {
    var fakultaeten = [];
    if (rep.length == 0) {
      res.json(fakultaeten);
      return;
    }
    client.mget(rep, function(err, rep) {
      rep.forEach(function(val) {
        fakultaeten.push(JSON.parse(val));
      });
      res.json(fakultaeten);
    });
  });
});

router.get('/:id', function(req, res){
  client.get('faculty:' + req.params.id, function(err,rep) { //Hole den fakultaet mit der bestimmten ID
    if (rep) {
      res.type('json').send(rep); //Ist ja schon ein String
    }
    else {
      res.status(404).type('text').send('Die Fakultaet mit der ID ' +
      req.params.id +
      ' wurde nicht gefunden');
    };
  });
});

router.put('/:id', function(req,res) {
  console.log("Aktualisiere eine existierende Fakultaet...");
  client.exists('faculty:' + req.params.id, function(err, rep) {
    if (rep == 1) {
      var updatedfakultaet = req.body;
      updatedfakultaet.id = req.params.id;
      client.set('faculty:' + req.params.id, JSON.stringify(updatedfakultaet), function(err, rep) {
        res.json(updatedfakultaet);
      });
    }
    else {
      res.status(404).type('text').send('Die Fakultaet mit der ID ' +
      req.params.id +
      ' existiert nicht.');
    }
  });
});

router.delete('/:id', function(req, res) {
  console.log("Lösche eine existierende Fakultaet...");
  client.del('faculty:' +req.params.id, function(err, rep) {
      if (rep == 1) {
        res.status(200).type('text').send('OK');
      }
      else {
        res.status(404).type('text').send('Die Fakultaet mit der ID ' +
        req.params.id +
        ' existiert nicht.');
      }
  });
});

module.exports = router;