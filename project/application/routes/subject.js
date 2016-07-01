var express = require('express');
var http = require('http');
var service = require('../bin/serviceConnector');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('subject', {title: 'Anlegen eines Moduls'});
});

router.post('/', function (req, res, next) {
    callback = function (data) {
        res.send("Modul erfolgreich angelegt");
    }

    service.sendPost('/subject', JSON.stringify(req.body), callback);
});

request ('http://127.0.0.1:3000/university', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var uni = JSON.parse (body);
            uni.forEach (function (uni) {
    
                        req.userData.uni = JSON.stringify (uni);
                        next();
    
                        return true;
    
            });
        }
}); 

request ('http://127.0.0.1:3000/faculty', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var faculty = JSON.parse (body);
            faculty.forEach (function (faculty) {
    
                        req.userData.faculty = JSON.stringify (faculty);
                        next();
    
                        return true;
    
            });
        }
}); 

module.exports = router;