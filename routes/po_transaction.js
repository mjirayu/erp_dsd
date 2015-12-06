var express = require('express');
var router = express.Router();

// Models
var dataTransaction = require('./../models/po_transaction');
var dataPOHeader = require('./../models/po_header');

// Helpers
var dateFunction = require('./../helpers/date');
var validate = require('./../helpers/validate');

router.get('/', function(req, res, next) {
  dataTransaction.find({})
    .populate('po_id')
    .populate('pd_id')
    .exec(function(err, collection) {
      res.json(collection);
    });
});

router.post('/', function(req, res, next) {
  var message = [];
  var arrayTransactions = req.body.transactions;
  var today = dateFunction.getDate();

  if (!req.body.sp_id) {
    message.push({
      ErrorCode: 1,
      ErrorMessage: 'supplierCode is null.',
    });
  }

  if (!req.body.order_date) {
    message.push({
      ErrorCode: 2,
      ErrorMessage: 'orderDate is null.',
    });
  }

  if (arrayTransactions.length == 0) {
    message.push({
      ErrorCode: 3,
      ErrorMessage: 'poItem is null.',
    });
  }

  if (message.length == 0) {
    dataPOHeader.create({
      po_id: req.body.po_id,
      sp_id: req.body.sp_id,
      order_date: req.body.order_date,
      expected_date: req.body.expected_date,
      untaxed_total: req.body.untaxed_total,
      total: req.body.total,
      po_status: req.body.po_status,
      invoice_no: req.body.invoice_no,
      update_date: today,
      update_by: 'User',
    }, function(err, data) {
        arrayTransactions.forEach(function(item) {
          dataTransaction.create({
            po_id: data._id,
            pd_id: item.pd_id,
            quantity: item.quantity,
            price: item.price,
            update_date: today,
            update_by: 'User',
          });
        });
      });
  } else {
    res.send(message);
  }
});

router.put('/:id', function(req, res, next) {
  var today = dateFunction.getDate();
  dataTransaction.findById(req.params.id, function(err, data) {
    data.po_id = req.body.po_id;
    data.pd_id = req.body.pd_id;
    data.quantity = req.body.quantity;
    data.price = req.body.price;
    data.update_date = today;
    data.update_by = req.body.update_by;
    data.save(function(err) {
      if (err) {
        var message = validate.getMessage(err);
        res.send(message);
      } else {
        res.send('Updated');
      }
    });
  });
});

router.delete('/:id', function(req, res, next) {
  dataTransaction.findById(req.params.id, function(err, data) {
    data.remove(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send('Deleted');
      }
    });
  });
});

module.exports = router;
