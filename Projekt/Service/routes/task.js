var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

router.post('/', function(req,res) {
    var newTask = req.body; //Der Body enthält das bereits geparste JSON-Objekt
    console.log("Lege einen neuen Task an...");
    client.incr('id:tasks', function(err,rep){ //ID-Counter für tasks um eins erhoehen
    newTask.id = rep; //Die ID des neuen tasks auf den Wert des Counters setzen
    client.set('task:' + newTask.id, JSON.stringify(newTask), function(err, rep){ //task in Daten ...
      res.json(newTask);
    });
  });
});

router.get('/', function(req, res) {
console.log("Gib alle existierenden Tasks aus...");
  client.keys('task:*', function(err, rep) { //Alle Keys holen, die mit "task:" beginnen
    var tasks = []; //Leeres Array, um den task zwischenzuspeichern
    if (rep.length == 0) {
      res.json(tasks);
      return;
    }
    client.mget(rep, function(err, rep) { //Hole die Liste aller tasks auf einmal
      //Iteriere über das Antwortarray und füge den Task dem Array hinzu
      rep.forEach(function(val) {
        tasks.push(JSON.parse(val));
      });
      //Die Eigenschaften rausfiltern, die uns interessieren
      tasks = tasks.map(function(task) {
        return {id: task.id, name: task.name};
      });
      res.json(tasks);
    });
  });
});

router.get('/:id', function(req, res){
    client.get('task:' + req.params.id, function(err,rep) { //Hole den task mit der bestimmten ID
    if (rep) {
      res.type('json').send(rep); //Ist ja schon ein String
    }
    else {
      res.status(404).type('text').send('Der Task mit der ID ' +
      req.params.id +
      ' wurde nicht gefunden');
    };
  });
});

router.put('/:id', function(req,res) {
console.log("Aktualisiere einen existierenden Task...");
  client.exists('task:' + req.params.id, function(err, rep) {
    if (rep == 1) {
      var updatedTask = req.body;
      updatedTask.id = req.params.id;
      client.set('task:' + req.params.id, JSON.stringify(updatedTask), function(err, rep) {
        res.json(updatedTask);
      });
    }
    else {
      res.status(404).type('text').send('Der Task mit der ID ' +
      req.params.id +
      ' existiert nicht.');
    }
  });
});

router.delete('/:id', function(req, res) {
console.log("Lösche einen existierenden Task...");
  client.del('task:' +req.params.id, function(err, rep) {
      if (rep == 1) {
        res.status(200).type('text').send('OK');
      }
      else {
        res.status(404).type('text').send('Der Task mit der ID ' +
        req.params.id +
        ' existiert nicht.');
      }
  });
});
module.exports = router;