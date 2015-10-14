var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('all product');
});

router.get('/:id', function(req, res, next) {
  res.send('product : '+req.params.id);
});

router.post('/', function(req, res, next) {
  console.log('Post Product');
});

router.post('/:id', function(req, res, next) {
  console.log('Post Product :'+req.params.id);
});

router.delete('/:id', function(req, res, next) {
  console.log('delete Product :'+req.params.id);
});

module.exports = router;
