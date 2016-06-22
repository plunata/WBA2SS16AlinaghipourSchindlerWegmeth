var redis = require('redis');
var client = redis.createClient();

module.exports = {
    // findet alle einträge zu einem Key. Benötigt wird ein key (university, faculty,groups ect) und ein Child (university -> faculty) ...
    findAll: function(req, res, key, child) {
        //welche HOST ruft mich auf
        var host = req.headers.host;

        //gibt mir alle Einträge zu einem Key
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
                //für jeden treffer müssen wior die Resource jetzt auffrischen
                object.forEach(function (val) {
                    var children = [];
                    //wenn es childs gibt, dann wollen wir einen Link generieren, statt nur die ID zu zeigen
                    if (val[child]) {
                        val[child].forEach(function (val) {
                            //der link besteht aus HOST/CHILD/ID
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
    //Finde einen Eintragn anhand einer ID
    findById: function(req, res, key, child) {
        var host = req.headers.host;
        client.get(key + ':' + req.params.id, function(err,rep) {
            if (rep) {
                var object = JSON.parse(rep);
                if(object.hasOwnProperty(child)){
                    var children = [];
                    object[child].forEach(function (val) {
                        children.push(host + '/' + child + '/' + val);
                    });
                    object[child] = children;
                }
                res.type('json').send(JSON.stringify(object));
            }
            else {
                res.status(404).type('text').send('Die Uni mit der ID ' +
                    req.params.id +
                    ' wurde nicht gefunden');
            };
        });
    },

    //Legt einen Eintrag neu an. gedacht für alle Ressourcen die von einer Parent Ressource abgehen. DH Wenn ich eine Faculty anlegen möchte, muss ich wissen für welche Uni
    postParentCallback: function (req, res, key, parentkey) {
        var newObject = req.body;

        //Wenn kein parentKey dann weiß ich nicht wer mein Vater ist, dann kann ich nicht angelegt werden!
        if (!newObject.hasOwnProperty(parentkey)) {
            res.status("406").type("text").send("need prop " + parentkey);
            return;
        }
        //prüfe ob mein Vater exestiert. Wenn nicht, kan nich nicht angelegt werden!!
        client.exists(parentkey + ':' + newObject[parentkey], function (err, reply) {
            if (reply === 0) {
                res.status(406).type('text').send('Die ' + parentkey + ' mit der ID ' + req.params.id + ' wurde nicht gefunden');
                return;
            }
            //erzeuge eine ID
            client.incr('id:' + key, function (err, rep) {
                newObject.id = rep;
                client.set(key + ':' + newObject.id, JSON.stringify(newObject), function (err, rep) {
                    client.get(parentkey + ':' + newObject[parentkey], function (err, rep) {
                        //mein Parent als JS Objekt, hat entweder schn eine Liste von Childs oder bekommt eine neue liste angelegt
                        var parent = JSON.parse(rep);
                        if (parent.hasOwnProperty(key)){
                            parent[key].push(newObject.id);
                        }else{
                            var f = new Array(1);
                            f[0]=newObject.id;
                            parent[key] = f;
                        }
                        //mein Parent aktualisieren!
                        client.set(parentkey +':'+ parent.id, JSON.stringify(parent), function(err, rep) {
                            res.status("201").type("text").send(JSON.stringify(newObject.id));
                            return;
                        });
                    });
                });
             });
        });
    },

    //Wenn ich keinen Parent habe, dann ist alles viel einfacher! 
    postCallback: function (req, res, key) {
        var object = req.body;
        if(!object.hasOwnProperty('name')){
            res.status("406").type("text").send("need prop name");
            return;
        }
        client.incr('id:'+key, function(err,rep){
            object.id = rep;
            client.set(key+':' + object.id, JSON.stringify(object), function(err, rep){
                res.status(200).type('text').send("created: :" +  object.id);
            });
        });
    },

    update: function (req, res, key, children) {
        console.log("update " + key +" id:" + req.params.id);
        client.get(key + ':' + req.params.id, function(err, dbObj) {
            if (dbObj) {
                var newObject = req.body;
                var objectOld = JSON.parse(dbObj);

                newObject.id = objectOld.id;
                if (objectOld.hasOwnProperty(children)) {
                    newObject[children] = objectOld[children];
                }
                client.set(key + ':' + req.params.id, JSON.stringify(newObject), function(err, rep) {
                    res.status(200).type('text').send(req.params.id + ' updated');
                });
            }else {
                res.status(204).type('text').send(key + ' mit der ID ' + req.params.id + ' existiert nicht.');
            }
        });
    }
}