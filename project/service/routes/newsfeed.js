//todo: ist der newsfeed wirklich eine Recourse? ist das für eilmeldungen gedacht oder so?

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

router.post('/', function(req,res) {
  console.log("Gib einen existierenden User aus...");
});

router.get('/', function(req, res) {
  console.log("Gib alle existierenden User aus...");
});



router.get('/:id', function(req, res){

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

router.put('/:id', function(req,res) {

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

router.delete('/:id', function(req, res) {

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