var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var app = express();
app.use(bodyParser.json());

router.get('/', function(req, res, next) {
    
    client.keys('university:*', function(err, rep) {
        var uni = [];
        if (rep.length == 0) {
            res.json(uni);
            return;
        }
        client.mget(rep, function(err, uniarr) {
            res.json((JSON.parse(uniarr)));
        });
    });
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
    var newUni = req.body;
    client.incr('id:university', function(err,rep){
        newUni.id = rep;
        client.set('university:' + newUni.id, JSON.stringify(newUni), function(err, rep){
            res.status(200).type('text').send("created: :" +  newUni.id);
        });
    });
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