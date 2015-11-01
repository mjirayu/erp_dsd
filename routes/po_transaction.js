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
  var arrayTransactions = req.body.transactions;
  var today = dateFunction.getDate();
  dataPOHeader.create({
    po_id: req.body.po_id,
    sp_id: req.body.sp_id,
    order_date: req.body.order_date,
    expected_date: req.body.expected_date,
    total: req.body.total,
    po_status: req.body.po_status,
    invoice_no: req.body.invoice_no,
    update_date: today,
    update_by: 'User'
  }, function(err, data) {
    if (err) {
      var message = validate.required(err);
      res.send(message);
    } else {
      arrayTransactions.forEach(function(item) {
        dataTransaction.create({
          po_id: data._id,
          pd_id: item.pd_id,
          quantity: item.quantity,
          price: item.price,
          update_date: today,
          update_by: 'User',
        }, function(err) {
          if (err) {
            var message = validate.required(err);
            res.send(message);
          } else {
            res.send('Created');
          }
        });
      });
    }
  });
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
        var message = validate.required(err);
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
