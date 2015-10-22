var express = require('express');
var router = express.Router();
var dataPOHeader = require('./../models/po_header');

router.get('/', function(req, res, next) {
  dataPOHeader.find({}, function(err, collection) {
    res.json(collection);
  });
});

router.get('/:po_id', function(req, res, next) {
  dataPOHeader.findOne({po_id: req.params.po_id}).populate('sp_id').exec(function(err, data) {
    po = data;
    res.send(po);
  });
});

router.get('/search', function(req, res, next) {
  var params = req.query;
  var po_id = new RegExp(params.po_id, 'i');
  var order_date = new RegExp(params.order_date, 'i');
  var po_status = new RegExp(params.po_status, 'i');

  dataPOHeader.find({
    po_id: { $regex: po_id },
    po_status: { $regex: po_status },
    // order_date: new Date(2015, 9, 21)
  }, function(err, collection) {
    res.json(collection);
  });
});

router.get('/create', function(req, res, next) {

});


module.exports = router;
