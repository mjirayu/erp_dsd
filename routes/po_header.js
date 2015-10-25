var express = require('express');
var router = express.Router();
var dataPOHeader = require('./../models/po_header');
var dataSupplier = require('./../models/m_supplier');

router.get('/', function(req, res, next) {
  dataPOHeader
    .find({})
    .populate('sp_id')
    .exec(function(err, collection) {
      res.json(collection);
    });
});

router.post('/', function(req, res, next) {
  dataPOHeader.create({
    po_id: req.body.po_id,
    sp_id: req.body.sp_id,
    order_date: req.body.order_date,
    expected_date: req.body.expected_date,
    total: req.body.total,
    po_status: req.body.po_status,
    invoice_no: req.body.invoice_no,
    update_date: new Date(),
    update_by: 'User'
  });
});

router.get('/search', function(req, res, next) {
  var params = req.query;
  var po_id = new RegExp(params.po_id, 'i');
  var po_status = new RegExp(params.po_status, 'i');
  var sp_name = new RegExp(params.sp_name, 'i');
  var order_date = new RegExp(params.order_date, 'i');

  dataSupplier.find({name: sp_name}, function(err, data) {
    dataPOHeader
      .find({
        po_id: { $regex: po_id },
        po_status: { $regex: po_status },
        order_date: { $regex: order_date },
      })
      .populate('sp_id', null, {name: { $regex: sp_name }})
      .exec(function(err, collection) {
        res.json(collection);
      });
  });

});

router.get('/:po_id', function(req, res, next) {
  dataPOHeader
    .findOne({po_id: req.params.po_id})
    .populate('sp_id').exec(function(err, data) {
      res.json(data);
    });
});


module.exports = router;