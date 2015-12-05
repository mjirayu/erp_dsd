var express = require('express');
var router = express.Router();
var po_headerModel = require('./../models/po_header');
var po_transactionModel = require('./../models/po_transaction');
var supplierModel = require('./../models/m_supplier');

var validate = require('./../helpers/validate');

router.get('/incomming', function(req, res, next) {
  po_headerModel
    .find({})
    .populate('sp_id')
    .exec(function(err, collection) {
      res.json(collection);
    });
});

router.get('/incomming/search', function(req, res, next) {
  var params = req.query;
  var po_id = new RegExp(params.po_id, 'i');
  var po_status = new RegExp(params.po_status, 'i');
  var sp_name = new RegExp(params.sp_name, 'i');
  var order_date = new RegExp(params.order_date, 'i');

  po_headerModel
    .find({
      po_id: { $regex: po_id },
      po_status: { $regex: po_status },
      order_date: { $regex: order_date },
    })
    .populate('sp_id', null, {name: { $regex: sp_name }})
    .exec(function(err, collection) {
      if (err) res.send(err);
      data = collection.filter(function(item) {
        if (item.sp_id == null) return false;
        return true;
      })
      .map(function(item) {
        return item;
      });

      res.send(data);
    });
});

router.get('/incomming/detail/:id', function(req, res, next) {
  po_transactionModel.find({})
    .populate('po_id',null,{ _id: req.params.id
            })
    .populate('pd_id')
    .exec(function(err, data) {
      res.json(data);
    });
});

router.get('/incomming/:id', function(req, res, next) {
  po_headerModel
    .find({_id : req.params.id})
    .populate('sp_id')
    .exec(function(err, collection) {
      res.json(collection);
    });
});

module.exports = router;
