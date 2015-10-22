var express = require('express');
var router = express.Router();
var priceDB = require('./../models/product_price');

router.post('/price',function(req,res){
  data = {};
  data.sp_id =  req.body.sp_id;
  data.pd_id =  req.body.pd_id;
  data.pd_price = req.body.pd_price;
  data.minimun_order = req.body.minimun_order;
  data.effective_date = new Date(req.body.effective_date);
  data.update_date = Date();
  data.update_by =  "admin";
  data_check = true;
  if(data.effective_date == "" || data.effective_date == "Invalid Date"){
    res.send("Invalid Date"+data.effective_date);
    data_check = false;
  }
  for(item in data) {
    console.log(item + " is "+data[item]);
    if(data[item] === undefined || data[item] === "") {
      res.send(item + " is undefined");
      data_check = false;
      break;
    }
  }
  if(!data_check) return false;
  priceDB.create(data,function(err,data){
    if(err) res.send(err);
    res.send(data);
  });

});

router.get('/price',function(req,res){
  priceDB.find({},function(err,data){
    if(err) res.send(err);
    res.send(data);
  });
});

router.get('/price/:id',function(req,res){
  priceDB.findById(req.params.id,function(err,data){
    if(err) res.send(err);
    res.send(data);
  })
});

router.delete('/price/:id',function(req,res){
  priceDB.findByIdAndRemove(req.params.id,function(err,data){
    if(err) res.send(err);
    res.send("deleted");
  })
});

router.put('/price/:id',function(req,res){
  data = {};
  data.sp_id =  req.body.sp_id;
  data.pd_id =  req.body.pd_id;
  data.pd_price = req.body.pd_price;
  data.minimun_order = req.body.minimun_order;
  data.effective_date = new Date(req.body.effective_date);
  data.update_date = Date();
  data.update_by =  "admin";
  data_check = true;
  if(data.effective_date == "" || data.effective_date == "Invalid Date"){
    res.send("Invalid Date"+data.effective_date);
    data_check = false;
  }
  for(item in data) {
    console.log(item + " is "+data[item]);
    if(data[item] === undefined || data[item] === "") {
      res.send(item + " is undefined");
      data_check = false;
      break;
    }
  }
  if(!data_check) return false;
  priceDB.findByIdAndUpdate(req.params.id,data,function(err,data){
    if(err) res.send(err);
    res.send(data);
  });

});

module.exports = router;
