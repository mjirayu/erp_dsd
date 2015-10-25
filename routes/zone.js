var express = require('express');
var router = express.Router();
var zoneModel = require('./../models/m_zone');

router.post('/zone',function(req,res){
  data = {};
  data.zone_name =  req.body.zone_name;
  data.zone_type =  req.body.zone_type;
  data.zone_desc = req.body.zone_desc;
  data.update_date = Date();
  data.update_by =  "admin";
  data_check = true;

  for(item in data) {
    console.log(item + " is "+data[item]);
    if(data[item] === undefined || data[item] === "") {
      res.send(item + " is undefined");
      data_check = false;
      break;
    }
  }
  if(!data_check) return false;
  zoneModel.create(data,function(err,data){
    if(err) res.send(err);
    res.send(data);
  });

});

router.get('/zone',function(req,res){
  priceDB.find({},function(err,data){
    if(err) res.send(err);
    res.send(data);
  });
});

router.get('/zone/:id',function(req,res){
  zoneModel.findById(req.params.id,function(err,data){
    if(err) res.send(err);
    res.send(data);
  })
});

router.delete('/zone/:id',function(req,res){
  priceDB.findByIdAndRemove(req.params.id,function(err,data){
    if(err) res.send(err);
    res.send("deleted");
  })
});

router.put('/zone/:id',function(req,res){
  data = {};
  data.zone_name =  req.body.zone_name;
  data.zone_type =  req.body.zone_type;
  data.zone_desc = req.body.zone_desc;
  data.update_date = Date();
  data.update_by =  "admin";
  data_check = true;

  for(item in data) {
    console.log(item + " is "+data[item]);
    if(data[item] === undefined || data[item] === "") {
      res.send(item + " is undefined");
      data_check = false;
      break;
    }
  }
  if(!data_check) return false;
  zoneModel.findByIdAndUpdate(req.params.id,data,function(err,data){
    if(err) res.send(err);
    res.send(data);
  });

});

router.get('/zone/search', function(req, res, next) {
  var params = req.query;
  var zone_type = new RegExp(params.zone_type, 'i');
  var zone_name = new RegExp(params.zone_name, 'i');

  zoneModel.find({
      zone_type: { $regex: zone_type },
      zone_name: { $regex: zone_name }
    }.function(err, data) {
      res.send(data);
    });
});

module.exports = router;
