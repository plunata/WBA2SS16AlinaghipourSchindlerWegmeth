var express = require ('express');
var router = express.Router ();
var http = require ('http');
var service = require('../bin/serviceConnector');
/* GET home page. */
router.post ('/', function (req, res, next) {
    var reqData = req.body;

    callback = function (data) {
        var users = JSON.parse(data);
        users.forEach(function (user) {
            if(user.email== reqData.email){
                if(user.password == reqData.password){

                }
            }
        })
    }
    service.sendGet('/user',callback);
    res.redirect('http://localhost:3001/dashboard');
    res.send(302);
});

module.exports = router;
