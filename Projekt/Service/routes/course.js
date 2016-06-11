var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var redis = require('redis');



var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

app.post('/courses', function(req,res) {

  console.log("Gib einen existierenden Studiengang aus...");

  var newCourse = req.body; //Der Body enthält das bereits geparste JSON-Objekt

  console.log("Lege einen neuen Studiengang an...");

  client.incr('id:courses', function(err,rep){ //ID-Counter für course um eins erhoehen

    newCourse.id = rep; //Die ID des neuen courses auf den Wert des Counters setzen

    client.set('course:' + newCourse.id, JSON.stringify(newCourse), function(err, rep){ //course in Daten ...
      res.json(newCourse);
    });

  });

});

app.get('/courses', function(req, res) {

  console.log("Gib alle existierenden Studiengänge aus...");

  client.keys('course:*', function(err, rep) { //Alle Keys holen, die mit "course:" beginnen

    var courses = []; //Leeres Array, um die course zwischenzuspeichern

    if (rep.length == 0) {
      res.json(courses);
      return;
    }

    client.mget(rep, function(err, rep) { //Hole die Liste aller course auf einmal

      //Iteriere über das Antwortarray und füge die course dem Array hinzu
      rep.forEach(function(val) {
        courses.push(JSON.parse(val));
      });

      //Die Eigenschaften rausfiltern, die uns interessieren
      courses = courses.map(function(course) {
        return {id: course.id, name: course.name};
      });

      res.json(courses);

    });

  });
});



app.get('/courses/:id', function(req, res){

  client.get('course:' + req.params.id, function(err,rep) { //Hole den course mit der bestimmten ID

    if (rep) {
      res.type('json').send(rep); //Ist ja schon ein String
    }
    else {
      res.status(404).type('text').send('Der Studiengang mit der ID ' +
      req.params.id +
      ' wurde nicht gefunden');
    };

  });

});

app.put('/courses/:id', function(req,res) {

  console.log("Aktualisiere einen existierenden Studiengang...");

  client.exists('course:' + req.params.id, function(err, rep) {
    if (rep == 1) {
      var updatedcourse = req.body;
      updatedcourse.id = req.params.id;
      client.set('course:' + req.params.id, JSON.stringify(updatedcourse), function(err, rep) {
        res.json(updatedcourse);
      });
    }
    else {
      res.status(404).type('text').send('Der Studiengang mit der ID ' +
      req.params.id +
      ' existiert nicht.');
    }
  });
});

app.delete('/courses/:id', function(req, res) {

  console.log("Lösche einen existierenden Studiengang...");

  client.del('course:' +req.params.id, function(err, rep) {
      if (rep == 1) {
        res.status(200).type('text').send('OK');
      }
      else {
        res.status(404).type('text').send('Der Studiengang mit der ID ' +
        req.params.id +
        ' existiert nicht.');
      }
  });
});

module.exports = router;