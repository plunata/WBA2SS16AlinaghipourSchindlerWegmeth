var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

router.post('/', function(req,res) {
  var newSubject = req.body; //Der Body enthält das bereits geparste JSON-Objekt
  console.log("Lege ein neues Modul an...");
  client.incr('id:subjects', function(err,rep){ //ID-Counter für Module um eins erhoehen
    newSubject.id = rep; //Die ID des neuen Moduls auf den Wert des Counters setzen
    client.set('subject:' + newSubject.id, JSON.stringify(newSubject), function(err, rep){ //Module in Daten ...
      res.json(newSubject);
    });
  });
});

router.get('/', function(req, res) {
  console.log("Gib alle existierenden Module aus...");
  client.keys('subject:*', function(err, rep) { //Alle Keys holen, die mit "subject:" beginnen
    var subjects = []; //Leeres Array, um die Module zwischenzuspeichern
    if (rep.length == 0) {
      res.json(subjects);
      return;
    }
    client.mget(rep, function(err, rep) { //Hole die Liste aller Module auf einmal
      //Iteriere über das Antwortarray und füge das Modul dem Array hinzu
      rep.forEach(function(val) {
        subjects.push(JSON.parse(val));
      });
      //Die Eigenschaften rausfiltern, die uns interessieren
      subjects = subjects.map(function(subject) {
        return {id: subject.id, name: subject.name};
      });
      res.json(subjects);
    });
  });
});

router.get('/:id', function(req, res){
    client.get('subject:' + req.params.id, function(err,rep) { //Hole das Modul mit der bestimmten ID
    if (rep) {
      res.type('json').send(rep); //Ist ja schon ein String
    }
    else {
      res.status(404).type('text').send('Das Modul mit der ID ' +
      req.params.id +
      ' wurde nicht gefunden');
    };
  });
});

router.put('/:id', function(req,res) {
    console.log("Aktualisiere ein existierendes Modul...");
  client.exists('subject:' + req.params.id, function(err, rep) {
    if (rep == 1) {
      var updatedsubject = req.body;
      updatedsubject.id = req.params.id;
      client.set('subject:' + req.params.id, JSON.stringify(updatedsubject), function(err, rep) {
        res.json(updatedsubject);
      });
    }
    else {
      res.status(404).type('text').send('Das Modul mit der ID ' +
      req.params.id +
      ' existiert nicht.');
    }
  });
});

router.delete('/:id', function(req, res) {
  console.log("Lösche ein existierendes Modul...");
  client.del('subject:' +req.params.id, function(err, rep) {
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