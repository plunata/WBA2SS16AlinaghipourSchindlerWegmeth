var express = require('express');
var fs = require('fs');
var http = require('http'); //add the http module
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var file = __dirname+"/quotes/jsonData.json";

app.use(jsonParser);

// GET method route
app.get('/', jsonParser, function (req, res) {
  fs.readFile(file, function(err, jsonData) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }

    else {
      var jsonData = JSON.parse(jsonData.toString());
      res.json(jsonData);
      console.dir(jsonData);
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
