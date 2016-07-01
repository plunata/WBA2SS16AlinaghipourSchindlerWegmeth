var express = require ('express');
var router = express.Router ();
var request = require ('request');
var async = require ('async');
var app = express();
var http = require ('http');


/* GET home page. */
router.get ('/', function (req, res, next) {
    request ('http://127.0.0.1:3000/group', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var groups = JSON.parse (body);
            res.render ('dashboard', {title: 'Dashboard', "groups": groups});
        }
    });
});

router.get ('/group/:id', function (req, res, next) {

    var renderVar = {};
    request ('http://127.0.0.1:3000/group/' + req.params.id, function (error, response, body) {
        if (!(!error && response.statusCode == 200)) {
            console.log (error);
        }
        else {
            var group = JSON.parse (body);
            renderVar['title'] = 'Gruppe ' + group.name;

            async.map (group.task, function (url, done) {
                request (url, function (err, response, body) {
                    if (err || response.statusCode !== 200) {
                        return done (err || new Error ());
                    }
                    return done (null, JSON.parse (body));
                });
            }, function (err, results) {
                if (err) return res.sendStatus (500);
                var allTasks = results;
                var myTasks = [];
                renderVar['tasks'] = allTasks;
                var user = JSON.parse (req.userData.user);
                allTasks.forEach (function (task) {
                    if (task.editor == user.id) {
                        myTasks.push (task);
                    }
                })

                renderVar['personalTasks'] = myTasks;
                res.render ('group', renderVar);
            });
        }
    });
});

module.exports = router;
