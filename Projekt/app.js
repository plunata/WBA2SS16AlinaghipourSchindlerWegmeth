var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http'); //add the http module
var bodyParser = require('body-parser');
var redis = require('redis');
var rdb = redis.createClient();
var jsonParser = bodyParser.json();
var app = express();

// GET method route
app.get('/user/:id', jsonParser, function (req, res) {
  fs.readFile("./user.ejs", {encoding: "utf-8"} function(err, filestring) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }

    else {
      var userOptions = {
        host: "localhost",
        port: 3000,
        path: "/user/" + req.params.id,
        method: GET,
        headers: {
          accept: "application/json"
        }
      }

      res.json(filestring);
      console.dir(filestring);
    }
	});
});

app.post('/new', jsonParser, function (req, res) {
  console.log('Hey dude');
  fs.writeFile(file, JSON.stringify(req.body), function(err) {
    if (err) {
      res.status(500).end('Konnte Daten nicht speichern.');
      throw err;
    }
    console.log('It\'s saved!');
    res.json(req.body);
  });
});

app.listen(3000, function() {
	console.log('Listening on port 3000... Go to http://localhost:3000 on your browser');
});

app.get('*', function(req, res) {
	res.send('Bad Route');
});
