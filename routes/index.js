var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var Products = require('../app/controllers/product.js');

router.post('/add', Products.add);
router.post('/remove', Products.remove);

router.get('/search', Products.search);
router.get('/findall', Products.findall);

module.exports = router;