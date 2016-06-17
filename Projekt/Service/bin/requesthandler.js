var redis = require('redis');
var client = redis.createClient();

module.exports = {
    findAll: function(req, res, key, child) {
        var host = req.headers.host;

        client.keys(key + ':*', function (err, rep) {
            var object = [];
            if (rep.length == 0) {
                res.json(object);
                return;
            }

            client.mget(rep, function (err, objectArr) {
                objectArr.forEach(function (val) {
                    object.push(JSON.parse(val));
                });
                object.forEach(function (val) {
                    var children = [];
                    if (val[child]) {
                        val[child].forEach(function (val) {
                            children.push(host + '/' + child + '/' + val);
                        });
                        val[child] = children;
                    }
                })
                res.json(object);
                return;
            });
        });
    },
    findById: function(req, res, key, child) {
        client.get(key + ':' + req.params.id, function(err,rep) {
            if (rep) {
                res.type('json').send(rep);
            }
            else {
                res.status(404).type('text').send('Die Uni mit der ID ' +
                    req.params.id +
                    ' wurde nicht gefunden');
            };
        });
    },

    postParentCallback: function (req, res, key, parentkey) {
        var newObject = req.body;
        if (!newObject.hasOwnProperty(parentkey)) {
            res.status("406").type("text").send("need prop " + parentkey);
            return;
        }
        client.exists(parentkey + ':' + newObject[parentkey], function (err, reply) {
            if (reply === 0) {
                res.status(406).type('text').send('Die ' + parentkey + ' mit der ID ' + req.params.id + ' wurde nicht gefunden');
                return;
            }
            client.incr('id:' + key, function (err, rep) {
                newObject.id = rep;
                client.set(key + ':' + newObject.id, JSON.stringify(newObject), function (err, rep) {
                    client.get(parentkey + ':' + newObject[parentkey], function (err, rep) {
                        var parent = JSON.parse(rep);
                        if (parent.hasOwnProperty(key)){
                            parent[key].push(newObject.id);
                        }else{
                            var f = new Array(1);
                            f[0]=newObject.id;
                            parent[key] = f;
                        }
                        client.set(parentkey +':'+ parent.id, JSON.stringify(parent), function(err, rep) {
                            res.status("201").type("text").send(JSON.stringify(newObject.id));
                            return;
                        });
                    });
                });
             });
        });
    },

    postCallback: function (req, res, key) {
        var object = req.body;
        client.incr('id:'+key, function(err,rep){
            object.id = rep;
            client.set(key+':' + object.id, JSON.stringify(object), function(err, rep){
                res.status(200).type('text').send("created: :" +  object.id);
            });
        });
    }
}