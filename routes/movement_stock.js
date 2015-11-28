var express = require('express');
var router = express.Router();
var movementModel = require('./../models/movement_stock');
var dateFunction = require('./../helpers/date');

/* GET users listing. */

router.get('/movement',function(req,res){
  movementModel.find({},function(err,data){
    if(err) res.send(err);
    res.send(data);
  });
});

router.get('/movement/search/date', function(req, res, next) {
  var today = dateFunction.getDate();
  var params = req.query;
  var movement_type = new RegExp(params.transaction_type, 'i');
  var date_from = new Date(today);
  var date_to = new Date(params.date_to);
  var pd_id = params.pd_id;

  movementModel.find({
      pd_id: pd_id,
      movement_type: { $regex: movement_type },
      update_date : {
        $gte: date_from,
        $lte: date_to
      }
    },function(err, data) {
      res.send(data);
    });
});


router.get('/movement/search/period', function(req, res, next) {
  /*var lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() -7);*/
  var today = dateFunction.getDate();
  var params = req.query;
  var movement_type = new RegExp(params.transaction_type, 'i');
  var date_to = new Date();
  var date_from = new Date(today);
  var pd_id = params.pd_id;
  var period = params.period;
  var check_date = false;


  if(period == "today") {
    check_date = true;
  } else if (period == "7days") {
    date_from.setDate(date_from.getDate() -7);
    check_date = true;
  } else if (period == "1month") {
    date_from.setMonth(date_from.getMonth() -1);
    check_date = true;
  }else if (period == "3months") {
    date_from.setMonth(date_from.getMonth() -3);
    check_date = true;
  }else if (period == "6months") {
    date_from.setMonth(date_from.getMonth() -6);
    check_date = true;
  }else if (period == "1year") {
    date_from.setFullYear(date_from.getFullYear() -1);
    check_date = true;
  }else {
    res.send('Period is not match :'+period);
  }
/*
  console.log(params);
  console.log(date_from);
  console.log(date_to);
*/
  if(check_date){
    movementModel.find({
        pd_id: pd_id,
        movement_type: { $regex: movement_type },
        update_date : { //$lte : new Date("2015-11-28T13:19:41.000Z")
          $gte: date_from,
          $lte: date_to
        }
        /*{
          $gte: startDate.toDate(),
          $lte: endDate.toDate()
        }*/
      },function(err, data) {
        res.send(data);
      });
    }
    });

    router.get('/movement/:id',function(req,res){
      movementModel.find({
        pd_id: req.params.id
      },function(err,data){
        if(err) res.send(err);
        res.send(data);
      })
    });


module.exports = router;
