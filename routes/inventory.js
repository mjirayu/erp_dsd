var express = require('express');
var router = express.Router();
var inventoryModel = require('./../models/invemtory');
var productModel = require('./../models/m_pruduct');
var zoneModel = require('./../models/m_zone');

/* GET users listing. */

router.post('/inventory',function(req,res){
  data = {};
  data.pd_id =  req.body.pd_id ;
  data.quantity=  req.body.quantity;
  data.zone_id = req.body.zone_id;
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
  inventoryModel.create(data,function(err,data){
    if(err) res.send(err);
    res.send(data);
  });

});

router.get('/inventory',function(req,res){
  inventoryModel.find({},function(err,data){
    if(err) res.send(err);
    res.send(data);
  });
});

router.get('/inventory/:id',function(req,res){
  inventoryModel.findById(req.params.id,function(err,data){
    if(err) res.send(err);
    res.send(data);
  })
});

router.put('/inventory/:id',function(req,res){
  inventoryData = {};
  inventoryData.pd_id =  req.body.pd_id ;
  inventoryData.quantity=  req.body.quantity;
  inventoryData.zone_id = req.body.zone_id;
  inventoryData.update_date = Date();
  inventoryData.update_by =  "admin";
  inventoryData_check = true;


  for(item in inventoryData) {
    console.log(item + " is "+inventoryData[item]);
    if(inventoryData[item] === undefined || inventoryData[item] === "") {
      res.send(item + " is undefined");
      inventoryData_check = false;
      break;
    }
  }
  if(!inventoryData_check) return false;
  inventoryModel.findByIdAndUpdate(req.params.id,inventoryData,function(err,data){
    if(err) res.send(err);
    res.send(data);
  });

  // update MOVEMENT_STOCK

  movementData = {};
  movementData.pd_id =  req.body.pd_id ;
  movementData.movement_type=  req.body.movement_type;
  movementData.quantity = req.body.quantity;
  movementData.ref_po_id = req.body.ref_po_id;
  movementData.update_date = Date();
  movementData.update_by =  "admin";
  movementData_check = true;


  for(item in movementData) {
    console.log(item + " is "+movementData[item]);
    if(movementData[item] === undefined || movementData[item] === "") {
      res.send(item + " is undefined");
      movementData = false;
      break;
    }
  }
  if(!movementData_check) return false;
  movementModel.create(movementData,function(err,data){
    if(err) res.send(err);
    res.send(data);
  });

});


module.exports = router;
