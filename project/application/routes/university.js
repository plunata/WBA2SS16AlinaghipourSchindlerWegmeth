var express = require('express');
var http = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('university', {title: 'Registrierung einer Hochschule'});
});


router.post('/', function (req, res) {
    var data = JSON.stringify(req.body);

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

    var externalRequest = http.request(options, function (res) {
        externalRequest.on("data", function (chunk) {
            console.log("body: " + chunk);
        });
    });

    externalRequest.write(data);
    externalRequest.end();

    res.send("erfolg");

});


module.exports = router;
