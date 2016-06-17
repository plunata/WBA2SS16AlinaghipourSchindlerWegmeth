var requesthandler = require('../bin/requesthandler');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

router.get('/', function(req, res, next) {
    requesthandler.findAll(req, res, 'university', 'faculty');
});

router.get('/:id', function(req, res, next) {
    client.get('university:' + req.params.id, function(err,rep) {
        if (rep) {
            res.type('json').send(rep);
        }
        else {
            res.status(404).type('text').send('Die Uni mit der ID ' +
                req.params.id +
                ' wurde nicht gefunden');
        };
    });
});

router.post('/', function(req, res, next) {
    requesthandler.postCallback(req, res, 'university');
});

router.put('/:id', function(req, res, next) {
    console.log("Aktualisiere einen existierenden User...");
    client.exists('user:' + req.params.id, function(err, rep) {
        if (rep == 1) {
            var updatedUni= req.body;
            updatedUni.id = req.params.id;
            client.set('uni:' + req.params.id, JSON.stringify(updatedUni), function(err, rep) {
                res.json(updatedUni);
            });
        }
        else {
            res.status(404).type('text').send('Die Uni mit der ID ' +
                req.params.id +
                ' existiert nicht.');
        }
    });
});

router.delete('/:id', function(req, res, next) {
    client.del('university:' +req.params.id, function(err, rep) {
        if (rep == 1) {
            res.status(200).type('text').send('OK');
        }
        else {
            res.status(404).type('text').send('Die Uni mit der ID ' +
                req.params.id +
                ' existiert nicht.');
        }
    });
});
module.exports = router;