var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('university', { title: 'Registrierung einer Hochschule' });
});

router.post("/", function(req, res) {
    var data = JSON.stringify(req.body);
    console.log(req.body);
    console.log(data);
    var options = {
        host: "localhost",
        port: 3000,
        path: "/university",
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(data)
        }
    };
    
    var externalRequest = http.request(options, function(res) {
        externalRequest.on("data", function(chunk) {
            console.log("body: " + chunk);
        });
    });
    externalRequest.write(data);
    externalRequest.end();
    console.log("Universität erfolgreich angelegt");
});

module.exports = router;