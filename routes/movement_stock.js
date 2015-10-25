var express = require('express');
var router = express.Router();
var movementModel = require('./../models/movement_stock');

/* GET users listing. */

router.get('/movement',function(req,res){
  movementModel.find({},function(err,data){
    if(err) res.send(err);
    res.send(data);
  });
});

router.get('/movement/:id',function(req,res){
  movementModel.findById(req.params.id,function(err,data){
    if(err) res.send(err);
    res.send(data);
  })
});

router.get('/movement/search/date', function(req, res, next) {
  var params = req.query;
  var movement_type = new RegExp(params.transaction_type, 'i');
  var date_from = new Date(params.date_from);
  var date_to = new Date(params.date_to);
  var pd_id = params.pd_id;

  movementModel.find({
      pd_id: pd_id,
      movement_type: { $regex: movement_type },
      update_date : {
        $gte: date_from,
        $lt: date_to
      }
    }.function(err, data) {
      res.send(data);
    });
});

/*
router.get('/movement/search/period', function(req, res, next) {
  var params = req.query;
  var movement_type = new RegExp(params.transaction_type, 'i');
  var date_from = new Date(params.date_from);
  var date_to = new Date(params.date_to);
  var pd_id = params.pd_id;

  movementModel.find({
      pd_id: pd_id,
      movement_type: { $regex: movement_type },
      update_date : {
        $gte: date_from,
        $lt: date_to
      }
    }.function(err, data) {
      res.send(data);
    });
});
*/

module.exports = router;
