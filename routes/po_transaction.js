var express = require('express');
var router = express.Router();
var dataTransaction = require('./../models/po_transaction');

router.get('/', function(req, res, next) {
  dataTransaction.find({})
    .populate('po_id')
    .populate('pd_id')
    .exec(function(err, collection) {
      res.json(collection);
    });
});

router.post('/', function(req, res, next) {
  dataTransaction.create({
    po_id: req.body.po_id,
    pd_id: req.body.pd_id,
    quantity: req.body.quantity,
    price: req.body.price,
    update_date: new Date(req.body.update_date),
    update_by: req.body.update_by,
  }, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send('Created');
    }
  });
});

router.put('/:id', function(req, res, next) {
  dataTransaction.findById(req.params.id, function(err, data) {
    data.po_id = req.body.po_id;
    data.pd_id = req.body.pd_id;
    data.quantity = req.body.quantity;
    data.price = req.body.price;
    data.update_date = new Date(req.body.update_date);
    data.update_by = req.body.update_by;
    data.save(function(err) {
      if (err) {
        res.send(err);
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
