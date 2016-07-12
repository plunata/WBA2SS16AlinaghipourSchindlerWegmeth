var express = require('express');
var http = require('http');
var service = require('../bin/serviceConnector');
var router = express.Router();

router.get('/group', function (req, res, next) {
    var user = JSON.parse (req.userData.user);
    console.log(user.id);
    res.render('user_group', {title: 'Gruppe beitreten'});

});


module.exports = router;