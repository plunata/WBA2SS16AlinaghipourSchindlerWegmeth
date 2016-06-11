var express = require('express');
var router = express.Router();


var bodyParser = require('body-parser');

var redis = require('redis');

var client = redis.createClient();
var app = express();
app.use(bodyParser.json());


app.post('/users', function(req,res) {

  console.log("Gib einen existierenden User aus...");

  var newUser = req.body; //Der Body enthält das bereits geparste JSON-Objekt

  console.log("Lege einen neuen User an...");

  client.incr('id:users', function(err,rep){ //ID-Counter für User um eins erhoehen

    newUser.id = rep; //Die ID des neuen Users auf den Wert des Counters setzen

    client.set('user:' + newUser.id, JSON.stringify(newUser), function(err, rep){ //User in Daten ...
      res.json(newUser);
    });

  });

});

app.get('/users', function(req, res) {

  console.log("Gib alle existierenden User aus...");

  client.keys('user:*', function(err, rep) { //Alle Keys holen, die mit "user:" beginnen

    var users = []; //Leeres Array, um die User zwischenzuspeichern

    if (rep.length == 0) {
      res.json(users);
      return;
    }

    client.mget(rep, function(err, rep) { //Hole die Liste aller User auf einmal

      //Iteriere über das Antwortarray und füge die User dem Array hinzu
      rep.forEach(function(val) {
        users.push(JSON.parse(val));
      });

      //Die Eigenschaften rausfiltern, die uns interessieren
      users = users.map(function(user) {
        return {id: user.id, name: user.name};
      });

      res.json(users);

    });

  });
});



app.get('/users/:id', function(req, res){

  client.get('user:' + req.params.id, function(err,rep) { //Hole den User mit der bestimmten ID

    if (rep) {
      res.type('json').send(rep); //Ist ja schon ein String
    }
    else {
      res.status(404).type('text').send('Der User mit der ID ' +
      req.params.id +
      ' wurde nicht gefunden');
    };

  });

});

app.put('/users/:id', function(req,res) {

  console.log("Aktualisiere einen existierenden User...");

  client.exists('user:' + req.params.id, function(err, rep) {
    if (rep == 1) {
      var updatedUser = req.body;
      updatedUser.id = req.params.id;
      client.set('user:' + req.params.id, JSON.stringify(updatedUser), function(err, rep) {
        res.json(updatedUser);
      });
    }
    else {
      res.status(404).type('text').send('Der User mit der ID ' +
      req.params.id +
      ' existiert nicht.');
    }
  });
});

app.delete('/users/:id', function(req, res) {

  console.log("Lösche einen existierenden User...");

  client.del('user:' +req.params.id, function(err, rep) {
      if (rep == 1) {
        res.status(200).type('text').send('OK');
      }
      else {
        res.status(404).type('text').send('Der User mit der ID ' +
        req.params.id +
        ' existiert nicht.');
      }
  });
});

module.exports = router;