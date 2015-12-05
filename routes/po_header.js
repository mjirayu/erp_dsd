var express = require('express');
var router = express.Router();

// Models
var dataPOHeader = require('./../models/po_header');
var dataSupplier = require('./../models/m_supplier');

// Helpers
var dateFunction = require('./../helpers/date');
var validate = require('./../helpers/validate');

router.get('/', function(req, res, next) {
  dataPOHeader
    .find({})
    .populate('sp_id')
    .exec(function(err, collection) {
      if (collection.length == 0) {
        res.send([
          {
            ErrorCode: -1,
            ErrorMessage: 'Data not found',
          },
        ]);
      } else {
        res.json(collection);
      }
    });
});

router.get('/search', function(req, res, next) {
  var params = req.query;
  var po_id = new RegExp(params.po_id, 'i');
  var po_status = new RegExp(params.po_status, 'i');
  var sp_name = new RegExp(params.sp_name, 'i');
  var order_date = new RegExp(params.order_date, 'i');

  dataPOHeader
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

      if (data.length == 0) {
        res.send([
          {
            ErrorCode: -1,
            ErrorMessage: 'Data not found',
          },
        ]);
      } else {
        res.send(data);
      }
    });
});

router.put('/close/:id', function(req, res, next) {
  if (req.body.invoice_no) {
    dataPOHeader.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          'invoice_no': req.body.invoice_no,
          'po_status': 'Closed',
        },
      },
      function(err, data) {
        if (err) {
          message = validate.getMessage(err);
          res.send(message);
        } else {
          res.send('Success');
        }
      }
    );
  } else {
    res.send('invoice_no is null');
  }
});

router.get('/:id', function(req, res, next) {
  dataPOHeader
    .findOne({po_id: req.params.id})
    .populate('sp_id')
    .exec(function(err, data) {
      res.json(data);
    });
});

router.delete('/:id', function(req, res, next) {
  dataPOHeader.findById(req.params.id, function(err, data) {
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
