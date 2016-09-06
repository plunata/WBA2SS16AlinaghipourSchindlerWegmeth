var express = require ('express');
var http = require ('http');
var service = require ('../bin/serviceConnector');
var router = express.Router ();
var service = require ('../bin/serviceConnector');
var request = require ('request');
var request = require ('request');

/* GET home page. */
router.get ('/', function (req, res, next) {
});

router.put ('/:id', function (req, res, next) {
    request ('http://127.0.0.1:3000/task/' + req.params.id, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            finish = function (data) {

                request ('http://localhost:3000/task?id=' + data, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var task = JSON.parse (body)[0];
                        request ('http://localhost:3000/group?id=' + task.group, function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var group = JSON.parse (body)[0];
                                var message =
                                    "Der Task <span class='bold'>" + task.name + " </span> der Gruppe <a href ='http://localhost:3001/dashboard/group/" + group.id + "'>" + group.name + "</a> wurde erledigt";
                                var io = req.app.get ('socketio');
                                io.to (task.group).emit ('messages', {'message': message, 'time': new Date ()});
                                res.send ("data");
                            }
                        });
                    }
                });
            }
            var task = JSON.parse (body);
            task.editor = 1;

            service.sendPut ('/task/' + task.id, JSON.stringify (task), finish);
        }
    });

});


router.put ('/get/:id', function (req, res, next) {

    var uData = JSON.parse (req.userData.user);
    request ('http://127.0.0.1:3000/task/' + req.params.id, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            finish = function (data) {

                request ('http://localhost:3000/task?id=' + data, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var task = JSON.parse (body)[0];

                        request ('http://localhost:3000/group?id=' + task.group, function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var group = JSON.parse (body)[0];
                                var message =
                                    "Der Task <span class='bold'>" + task.name + " </span> der Gruppe <a href ='http://localhost:3001/dashboard/group/" + group.id + "'>"
                                    + group.name + "</a> wurde übernommen von " + uData.firstname + " " + uData.lastname ;
                                var io = req.app.get ('socketio');
                                io.to (task.group).emit ('messages', {'message': message, 'time': new Date ()});
                                res.send ("data");
                            }
                        });
                    }
                });
            }
            var uData = JSON.parse (req.userData.user);
            var task = JSON.parse (body);
            task.editor = uData.id;
            service.sendPut ('/task/' + task.id, JSON.stringify (task), finish);
        }

    });

});


router.post ('/', function (req, res, next) {

    var task = req.body;

    callback = function (data) {

        request ('http://localhost:3000/task?id=' + data, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var task = JSON.parse (body)[0];

                request ('http://localhost:3000/group?id=' + task.group, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var group = JSON.parse (body)[0];
                        var message =
                            "Neuer Task <span class='bold'>" + task.name + "</span> in Gruppe <a href ='http://localhost:3001/dashboard/group/" + group.id + "'>" + group.name + "</a>";
                        var io = req.app.get ('socketio');
                        io.to (task.group).emit ('messages', {'message': message, 'time': new Date ()});
                        res.send ("data");
                    }
                });


            }
        });
    }

    service.sendPost ('/task', JSON.stringify (req.body), callback);
});

module.exports = router;

