var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'This is a WebPage for CRUD operation of Contact using SQLite' });
});

module.exports = router;
