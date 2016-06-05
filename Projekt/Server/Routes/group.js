var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');

var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

app.post('/groups', function(req,res) {

  console.log("Gib eine existierende Gruppe aus...");

  var newGroup = req.body; //Der Body enthält das bereits geparste JSON-Objekt

  console.log("Lege eine neue Gruppe an...");

  client.incr('id:groups', function(err,rep){ //ID-Counter für group um eins erhoehen

    newGroup.id = rep; //Die ID des neuen groups auf den Wert des Counters setzen

    client.set('group:' + newGroup.id, JSON.stringify(newGroup), function(err, rep){ //group in Daten ...
      res.json(newGroup);
    });

  });

});

app.get('/groups', function(req, res) {

  console.log("Gib alle existierenden Gruppen aus...");

  client.keys('group:*', function(err, rep) { //Alle Keys holen, die mit "group:" beginnen

    var groups = []; //Leeres Array, um die group zwischenzuspeichern

    if (rep.length == 0) {
      res.json(groups);
      return;
    }

    client.mget(rep, function(err, rep) { //Hole die Liste aller group auf einmal

      //Iteriere über das Antwortarray und füge die group dem Array hinzu
      rep.forEach(function(val) {
        groups.push(JSON.parse(val));
      });

      //Die Eigenschaften rausfiltern, die uns interessieren
      groups = groups.map(function(group) {
        return {id: group.id, name: group.name};
      });

      res.json(groups);

    });

  });
});



app.get('/groups/:id', function(req, res){

  client.get('group:' + req.params.id, function(err,rep) { //Hole den group mit der bestimmten ID

    if (rep) {
      res.type('json').send(rep); //Ist ja schon ein String
    }
    else {
      res.status(404).type('text').send('Die Gruppe mit der ID ' +
      req.params.id +
      ' wurde nicht gefunden');
    };

  });

});

app.put('/groups/:id', function(req,res) {

  console.log("Aktualisiere eine existierende Gruppe...");

  client.exists('group:' + req.params.id, function(err, rep) {
    if (rep == 1) {
      var updatedgroup = req.body;
      updatedgroup.id = req.params.id;
      client.set('group:' + req.params.id, JSON.stringify(updatedgroup), function(err, rep) {
        res.json(updatedgroup);
      });
    }
    else {
      res.status(404).type('text').send('Die Gruppe mit der ID ' +
      req.params.id +
      ' existiert nicht.');
    }
  });
});

app.delete('/groups/:id', function(req, res) {

  console.log("Lösche eine existierende Gruppe...");

  client.del('group:' +req.params.id, function(err, rep) {
      if (rep == 1) {
        res.status(200).type('text').send('OK');
      }
      else {
        res.status(404).type('text').send('Die Gruppe mit der ID ' +
        req.params.id +
        ' existiert nicht.');
      }
  });
});


app.listen(3000);
