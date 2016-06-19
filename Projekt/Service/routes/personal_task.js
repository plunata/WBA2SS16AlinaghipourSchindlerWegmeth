// brauchen wir einen personal_task??? ist das nicht ein ganz normaler task der einem User zugeordnet ist?
// Ja aber es gibt auch Gruppentasks die einer Gruppe zugeordnet sind. Im Prinzip könnte man auch nur die Referenz ändern


var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

router.post('/', function(req,res) {
    var newPersonalTask = req.body; //Der Body enthält das bereits geparste JSON-Objekt
    console.log("Lege ein neues Personal Task an...");
    client.incr('id:personalTasks', function(err,rep){ //ID-Counter für Personal Tasks um eins erhoehen
    newPersonalTask.id = rep; //Die ID des neuen Personal Tasks auf den Wert des Counters setzen
    client.set('personalTask:' + newPersonalTask.id, JSON.stringify(newPersonalTask), function(err, rep){ //Personal Task in Daten ...
      res.json(newPersonalTask);
    });
  });
});

router.get('/', function(req, res) {
  console.log("Gib alle existierenden Personal Tasks aus...");
  client.keys('personalTask:*', function(err, rep) { //Alle Keys holen, die mit "personalTask:" beginnen
    var personalTasks = []; //Leeres Array, um den personalTask zwischenzuspeichern
    if (rep.length == 0) {
      res.json(personalTasks);
      return;
    }
    client.mget(rep, function(err, rep) { //Hole die Liste aller personalTasks auf einmal
      //Iteriere über das Antwortarray und füge den personalTask dem Array hinzu
      rep.forEach(function(val) {
        personalTasks.push(JSON.parse(val));
      });
      //Die Eigenschaften rausfiltern, die uns interessieren
      personalTasks = personalTasks.map(function(personalTask) {
        return {id: personalTask.id, name: personalTask.name};
      });
      res.json(personalTasks);
    });
  });
});



router.get('/:id', function(req, res){
    client.get('personalTask:' + req.params.id, function(err,rep) { //Hole den personalTask mit der bestimmten ID
    if (rep) {
      res.type('json').send(rep); //Ist ja schon ein String
    }
    else {
      res.status(404).type('text').send('Der PersonalTask mit der ID ' +
      req.params.id +
      ' wurde nicht gefunden');
    };
  });
});

router.put('/:id', function(req,res) {
console.log("Aktualisiere einen existierenden Personal Task...");
  client.exists('personalTask:' + req.params.id, function(err, rep) {
    if (rep == 1) {
      var updatedpersonalTask = req.body;
      updatedpersonalTask.id = req.params.id;
      client.set('personalTask:' + req.params.id, JSON.stringify(updatedpersonalTask), function(err, rep) {
        res.json(updatedpersonalTask);
      });
    }
    else {
      res.status(404).type('text').send('Der Personal Task mit der ID ' +
      req.params.id +
      ' existiert nicht.');
    }
  });
});

router.delete('/:id', function(req, res) {
  console.log("Lösche einen existierenden Personal Task...");
  client.del('personalTask:' +req.params.id, function(err, rep) {
      if (rep == 1) {
        res.status(200).type('text').send('OK');
      }
      else {
        res.status(404).type('text').send('Der Personal Task mit der ID ' +
        req.params.id +
        ' existiert nicht.');
      }
  });
});
module.exports = router;