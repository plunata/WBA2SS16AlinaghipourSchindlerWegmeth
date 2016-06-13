var redis = require('redis');
var client = redis.createClient();

module.exports = {
    postCallback: function (req, res, key, parentkey) {
        console.log("create fak");
        var newObject = req.body;
        if (!newObject.hasOwnProperty(parentkey)) {
            res.status("406").type("text").send("need prop " + parentkey);
            return;
        }
        client.exists(parentkey + ':' + newObject[parentkey], function (err, reply) {
            if (reply === 0) {
                res.status(404).type('text').send('Die ' + parentkey + ' mit der ID ' +
                    req.params.id +
                    ' wurde nicht gefunden');
                return;
            } else {
                client.incr('id:' + key, function (err, rep) {
                    newObject.id = rep;
                    client.set(key + ':' + newObject.id, JSON.stringify(newObject), function (err, rep) {
                        client.get(parentkey + ':' + newObject[parentkey], function (err, rep) {
                            client.hmset(parentkey + ':' + rep.id, key, newObject.id, function () {
                                res.status("201").type("text").send(JSON.stringify(newObject.id));
                                return;
                            });
                        });
                    });
                });
            }
        });
    }
}