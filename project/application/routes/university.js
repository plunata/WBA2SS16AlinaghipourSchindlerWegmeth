var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('university', { title: 'Registrierung einer Hochschule' });
});

module.exports = router;
