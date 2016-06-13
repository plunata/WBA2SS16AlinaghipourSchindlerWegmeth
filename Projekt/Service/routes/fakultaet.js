var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

router.post('/', function(req,res) {
  var newFakultaet = req.body;
  if (!newFakultaet.hasOwnProperty('university')) {
    res.status("406").type("text").send("need prop university");
    return;
  }

  client.incr('id:fakultaeten', function(err,rep){
    newFakultaet.id = rep;
    client.set('fakultaet:' + newFakultaet.id, JSON.stringify(newFakultaet), function(err, rep){
      res.status("201").type("text").send(JSON.stringify(newFakultaet.id));
      return;
    });

    client.get('uni:' + newFakultaet.university, function(err,rep) {
      if (rep) {
        client.hmset('uni:' + rep.id,'faculty',newFakultaet.id,function(){
          client.hmget('uni:' + rep.id,'faculty',function(err,rep){
            console.log(rep);
          });
        });
      }
      else {
        res.status(404).type('text').send('Die Uni mit der ID ' +
            req.params.id +
            ' wurde nicht gefunden');
        return;
      };
    });
  });



});

router.get('/', function(req, res) {
  console.log("Gib alle existierenden Fakultaeten aus...");
  client.keys('fakultaet:*', function(err, rep) {
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
  client.get('fakultaet:' + req.params.id, function(err,rep) { //Hole den fakultaet mit der bestimmten ID
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
  client.exists('fakultaet:' + req.params.id, function(err, rep) {
    if (rep == 1) {
      var updatedfakultaet = req.body;
      updatedfakultaet.id = req.params.id;
      client.set('fakultaet:' + req.params.id, JSON.stringify(updatedfakultaet), function(err, rep) {
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
  client.del('fakultaet:' +req.params.id, function(err, rep) {
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