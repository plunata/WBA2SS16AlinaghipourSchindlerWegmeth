var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

router.post('/', function(req,res) {
  var newFakultaet = req.body; //Der Body enthält das bereits geparste JSON-Objekt
  console.log("Lege eine neue Fakultaet an...");
  client.incr('id:fakultaeten', function(err,rep){ //ID-Counter für fakultaet um eins erhoehen
    newFakultaet.id = rep; //Die ID des neuen fakultaeten auf den Wert des Counters setzen
    client.set('fakultaet:' + newFakultaet.id, JSON.stringify(newFakultaet), function(err, rep){ //fakultaet in Daten ...
      res.json(newFakultaet);
    });
  });
});

router.get('/', function(req, res) {
  console.log("Gib alle existierenden Fakultaeten aus...");
  client.keys('fakultaet:*', function(err, rep) { //Alle Keys holen, die mit "fakultaet:" beginnen
    var fakultaeten = []; //Leeres Array, um die fakultaet zwischenzuspeichern
    if (rep.length == 0) {
      res.json(fakultaeten);
      return;
    }
    client.mget(rep, function(err, rep) { //Hole die Liste aller fakultaet auf einmal
      //Iteriere über das Antwortarray und füge die fakultaet dem Array hinzu
      rep.forEach(function(val) {
        fakultaeten.push(JSON.parse(val));
      });
      //Die Eigenschaften rausfiltern, die uns interessieren
      fakultaeten = fakultaeten.map(function(fakultaet) {
        return {id: fakultaet.id, name: fakultaet.name};
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