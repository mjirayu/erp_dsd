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


module.exports = router;
