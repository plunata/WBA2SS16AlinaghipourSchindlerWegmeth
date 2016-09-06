var express = require ('express');
var router = express.Router ();
var request = require ('request');
var async = require ('async');
var app = express ();
var http = require ('http');
var service = require ('../bin/serviceConnector');
var connections = require ('../bin/SocketConnections');

function remove (arrOriginal, elementToRemove) {
    return arrOriginal.filter (function (el) {
        return el !== elementToRemove
    });
}

router.get ('*', function (req, res, next) {

    if (!req.userData.user) {

        res.redirect ("/login");

    }
    else {

        next ();

    }

});

router.get ('/group/enter/:id', function (req, res, next) {

    request ('http://localhost:3000/group?id=' + req.params.id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            finish = function (data) {
                console.log ("group update");
            }

            var group = JSON.parse (body)[0];
            var uData = JSON.parse (req.userData.user);

            if (!group.users) {
                group.users = [];
            }

            group.users.push ("http://localhost:3000/user/" + uData.id);
            service.sendPut ('/group/' + group.id, JSON.stringify (group), finish);

            request ('http://localhost:3000/user?id=' + uData.id, function (error, response, body) {
                if (!error && response.statusCode == 200){

                    finish = function (data) {
                        console.log ("user update");
                    }

                    var users = JSON.parse (body);
                    var user = users[0];

                    if (!user.groups) {
                        user.groups = [];
                    }
                    user.groups.push ("http://localhost:3000/group/" + group.id);
                    service.sendPut ('/user/' + user.id, JSON.stringify (user), finish);
                    res.redirect ("/dashboard");
                }
            });
        }
    });

});

router.post ('/group/add', function (req, res, next) {
    callback = function (data) {

        finish = function (data) {
            console.log ("user update");
        }

        var groupID = data;
        var uData = JSON.parse (req.userData.user);

        request ('http://localhost:3000/user?id=' + uData.id, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var users = JSON.parse (body);
                var user = users[0];

                if (!user.groups) {
                    user.groups = [];
                }

                user.groups.push ("http://localhost:3000/group/" + data);
                service.sendPut ('/user/' + user.id, JSON.stringify (user), finish);
                res.send (data);
            }
        });
    }

    var uData = JSON.parse (req.userData.user);

    var groupData = req.body;
    groupData.users = [];
    groupData.users.push ('http://localhost:3000/user?id=' + uData.id);

    service.sendPost ('/group', JSON.stringify (req.body), callback);

});

router.get ('/group/add', function (req, res, next) {


    var uData = JSON.parse (req.userData.user);


    request ('http://localhost:3000/course?id=' + uData.course, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            var course = JSON.parse (body);

            async.map (course[0].subject, function (url, done) {

                request (url, function (err, response, body) {

                    if (err || response.statusCode !== 200) {
                        return done (err || new Error ());
                    }

                    return done (null, JSON.parse (body));

                });
            }, function (err, results) {

                if (err) return res.sendStatus (500);

                var allSubjects = results;

                res.render ('group/group_add', {
                    title: 'Gruppe erstellen',
                    course: course[0].name,
                    course_id: course[0].id,
                    subject: allSubjects
                });

            });

        }

    });


});

router.get ('/group/filter', function (req, res, next) {

    var filters = req.query;
    var queryString = "http://localhost:3000/group?";

    for (var key in req.query) {
        queryString += key + "=" + filters[key] + "&";
    }

    request (queryString, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            var groups = JSON.parse (body);

            res.render ('group/filter', {
                groups: groups
            });
        }

    });


});


router.get ('/group/find', function (req, res, next) {

    var uData = JSON.parse (req.userData.user);

    request ('http://localhost:3000/course?id=' + uData.course, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            var course = JSON.parse (body);

            async.map (course[0].subject, function (url, done) {

                request (url, function (err, response, body) {

                    if (err || response.statusCode !== 200) {
                        return done (err || new Error ());
                    }

                    return done (null, JSON.parse (body));

                });
            }, function (err, results) {

                if (err) return res.sendStatus (500);

                var allSubjects = results;

                res.render ('group/group_find', {
                    title: 'Gruppe finden',
                    course: course[0].name,
                    course_id: course[0].id,
                    subject: allSubjects,
                    groups: ""
                });

            });

        }

    });


});

router.get ('/', function (req, res, next) {

    var uData = JSON.parse (req.userData.user);

    request ('http://localhost:3000/user?id=' + uData.id, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var users = JSON.parse (body);
            var user = users[0];

            async.map (user.groups, function (url, done) {
                request (url, function (err, response, body) {
                    if (err || response.statusCode !== 200) {
                        return done (err || new Error ());
                    }
                    return done (null, JSON.parse (body));
                });
            }, function (err, results) {
                if (err) return res.sendStatus (500);

                var allGroups = results;
                res.render ('dashboard', {title: 'Dashboard', "groups": allGroups});
            });

        }
    });

});


router.get ('/group/:id', function (req, res, next) {

    var renderVar = {};
    request ('http://127.0.0.1:3000/group/' + req.params.id+"?done=0", function (error, response, body) {
        if (!(!error && response.statusCode == 200)) {
            console.log (error);
        }
        else {
            var group = JSON.parse (body);
            renderVar['title'] = 'Gruppe ' + group.name;
            renderVar['group_id'] = group.id;

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

                renderVar['user'] = user;

                allTasks.forEach (function (task) {
                    if (task.editor == user.id) {
                        myTasks.push (task);
                    }
                })

                renderVar['personalTasks'] = myTasks;
                res.render ('group/group_view', renderVar);
            });
        }
    });
});

module.exports = router;
