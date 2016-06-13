var redis = require('redis');
var client = redis.createClient();

module.exports = {
    postCallback: function (req, res, key, parentkey) {
        var host = req.headers.host;
        var newObject = req.body;
        if (!newObject.hasOwnProperty(parentkey)) {
            res.status("406").type("text").send("need prop " + parentkey);
            return;
        }
        client.exists(parentkey + ':' + newObject[parentkey], function (err, reply) {
            if (reply === 0) {
                res.status(404).type('text').send('Die ' + parentkey + ' mit der ID ' + req.params.id + ' wurde nicht gefunden');
                return;
            }
            client.incr('id:' + key, function (err, rep) {
                newObject.id = rep;
                client.set(key + ':' + newObject.id, JSON.stringify(newObject), function (err, rep) {
                    client.get(parentkey + ':' + newObject[parentkey], function (err, rep) {
                        var parent = JSON.parse(rep);
                        if (parent.hasOwnProperty(key)){
                            parent[key].push(host+"/"+key+"/"+(newObject.id));
                        }else{
                            var f = new Array(1);
                            f[0]=host+"/"+key+"/"+(newObject.id);
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
    }
}