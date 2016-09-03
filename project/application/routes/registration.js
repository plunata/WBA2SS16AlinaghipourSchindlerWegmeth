var express = require ('express');
var http = require ('http');
var request = require ('request');
var service = require ('../bin/serviceConnector');

var router = express.Router ();

/* GET home page. */
router.get ('/', function (req, res, next) {

    request ('http://127.0.0.1:3000/university', function (error, response, body) {

        if (!error && response.statusCode == 200) {
            var uni = JSON.parse (body);
            res.render ('registration', {title: 'Registrierung', university: uni});
        }

    });
});


router.get ('/uniData', function (req, res, next) {
    request ('http://127.0.0.1:3000/university', function (error, response, body) {

        if (!error && response.statusCode == 200) {
            var uni = JSON.parse (body);
            res.render ('registration/uniData', {title: 'Registrierung', university: uni});
        }

    });
});


router.get ('/:parent/:child', function (req, res, next) {

    var uni = req.query.uniId;
    var parent = req.params.parent;
    var child = req.params.child;

    request ('http://localhost:3000/'+child+'?'+parent+'=' + uni, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            var uni = JSON.parse (body);
            res.send (uni);
        }

    });
});


router.post ('/', function (req, res, next) {
    callback = function (data) {
        res.send ("User erfolgreich anleglegt. Login...");
    }

    service.sendPost ('/user', JSON.stringify (req.body), callback);
});

module.exports = router;
