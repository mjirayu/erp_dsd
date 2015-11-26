var express = require('express');
var router = express.Router();
var inventoryModel = require('./../models/inventory');
var productModel = require('./../models/m_product');
var zoneModel = require('./../models/m_zone');
var movementModel = require('./../models/movement_stock');

var dateFunction = require('./../helpers/date');
var validate = require('./../helpers/validate');

/* GET users listing. */

router.post('/inventory',function(req,res){
  var today = dateFunction.getDate();
  data = {};
  data.pd_id =  req.body.pd_id ;
  data.quantity=  req.body.quantity;
  data.zone_id = req.body.zone_id;
  data.update_date = today;
  data.update_by =  "admin";
  data_check = true;

/*  for(item in data) {
    console.log(item + " is "+data[item]);
    if(data[item] === undefined || data[item] === "") {
      res.send(item + " is undefined");
      data_check = false;
      break;
    }
  }*/
  if(!data_check) return false;
  inventoryModel.create(data,function(err,data){
    if(err) {
      var message = validate.getMessage(err);
      res.send(message);
    } else{
      res.send(data);
    }
  });

  // update movement
  movementData = {};
  movementData.pd_id =  req.body.pd_id ;
  movementData.movement_type = "receive)";
  movementData.movement_id = req.body.movement_id;
  movementData.quantity = req.body.quantity;
  movementData.ref_po_id = null;
  movementData.update_date = today;
  movementData.update_by =  "admin";
  movementData_check = true;

  /*  if(movementData.movement_type == 'supply' || movementData.movement_type == 'receive'){
    movementData_check = true;
  }
  else {
    res.send("Invalid movement type"+movementData.movement_type);
    movementData_check = false;
  }
  */
/*
  for(item in movementData) {
    console.log(item + " is "+movementData[item]);
    if(movementData[item] === undefined || movementData[item] === "") {
      res.send(item + " is undefined");
      movementData = false;
      break;
    }
  }*/
  if(!movementData_check) return false;
  movementModel.create(movementData,function(err,data){
    if (err) {
      var message = validate.getMessage(err);
      console.log(message);
    } else {
      console.log(data);
    }
  });

});

router.get('/inventory',function(req,res){
  /*
  inventoryModel.find({},function(err,data){
    if(err) res.send(err);
    res.send(data);
  });
*/
  inventoryModel
    .find({})
    .populate('pd_id')
    .populate('zone_id')
    .exec(function(err, collection) {
      res.json(collection);
    });
});

router.get('/inventory/search',function(req,res){
  //zone, productType, ProductName, ProductStatus
  var params = req.query;
  var zone_id = new RegExp(params.zone_id, 'i');
  var product_type = new RegExp(params.product_type, 'i');
  var product_name = new RegExp(params.product_name, 'i');
  var product_status = new RegExp(params.product_status, 'i');

  inventoryModel
    .find({})
    .populate('pd_id',null,{ pd_type: { $regex: product_type },
                              pd_name:{ $regex: product_name },
                              pd_status:{ $regex: product_status}
            })
    .populate('zone_id',null,{ zone_id: { $regex: zone_id }
          })
    .exec(function(err, collection) {
      if (err) res.send(err);
      data = collection.filter(function(item) {
        if ( item.zone_id == null || item.pd_id == null) return false;
        return true;
        })
        .map(function(item) {
            return item;
        });

      res.send(data);
    });

});

router.get('/inventory/:id',function(req,res){
  inventoryModel.findById(req.params.id,function(err,data){
    if(err) res.send(err);
    res.send(data);
  })
});

router.put('/inventory/supply/:id',function(req,res){
  var today = dateFunction.getDate();
  inventoryData = {};
  inventoryData.pd_id =  req.body.pd_id ;
  inventoryData.quantity=  req.body.quantity;
  inventoryData.zone_id = req.body.zone_id;
  inventoryData.update_date = today;
  inventoryData.update_by =  "admin";
  inventoryData_check = true;

/*  for(item in inventoryData) {
    console.log(item + " is "+inventoryData[item]);
    if(inventoryData[item] === undefined || inventoryData[item] === "") {
      res.send(item + " is undefined");
      inventoryData_check = false;
      break;
    }
  }
  */
  if(!inventoryData_check) return false;
  inventoryModel.findByIdAndUpdate(req.params.id,inventoryData,function(err,data){
    if (err) {
      var message = validate.getMessage(err);
      res.send(message);
    } else {
      res.send(data);
    }
  });

  // update MOVEMENT_STOCK

  movementData = {};
  movementData.pd_id =  req.body.pd_id ;
  movementData.movement_type = "supply";
  movementData.movement_id = req.body.movement_id;
  movementData.quantity = req.body.quantity;
  movementData.ref_po_id = null;
  movementData.update_date = today;
  movementData.update_by =  "admin";
  movementData_check = true;

/*  if(movementData.movement_type == 'supply' || movementData.movement_type == 'receive'){
    movementData_check = true;
  }
  else {
    res.send("Invalid movement type"+movementData.movement_type);
    movementData_check = false;
  }
*/
/*
  for(item in movementData) {
    console.log(item + " is "+movementData[item]);
    if(movementData[item] === undefined || movementData[item] === "") {
      res.send(item + " is undefined");
      movementData = false;
      break;
    }
  }*/
  if(!movementData_check) return false;
  movementModel.create(movementData,function(err,data){
    if (err) {
      var message = validate.getMessage(err);
      console.log(message);
    } else {
      console.log(data);
    }
  });

});

router.put('/inventory/:id',function(req,res){
  var today = dateFunction.getDate();
  inventoryData = {};
  //inventoryData.pd_id =  req.body.pd_id ;
  inventoryData.quantity=  req.body.quantity;
  inventoryData.zone_id = req.body.zone_id;
  inventoryData.update_date = today;
  inventoryData.update_by =  "admin";
  inventoryData_check = true;

/*  for(item in inventoryData) {
    console.log(item + " is "+inventoryData[item]);
    if(inventoryData[item] === undefined || inventoryData[item] === "") {
      res.send(item + " is undefined");
      inventoryData_check = false;
      break;
    }
  }*/
  if(!inventoryData_check) return false;
  inventoryModel.findByIdAndUpdate(req.params.id,inventoryData,function(err,data){
    if (err) {
      var message = validate.getMessage(err);
      res.send(message);
    } else {
      res.send(data);
    }
  });

  //productModel
  productData = {};
  //inventoryData.pd_id =  req.body.pd_id ;
  productData.safety_stock=  req.body.safety_stock;
  productData_check = true;

/*  for(item in inventoryData) {
    console.log(item + " is "+inventoryData[item]);
    if(inventoryData[item] === undefined || inventoryData[item] === "") {
      res.send(item + " is undefined");
      inventoryData_check = false;
      break;
    }
  }*/
  if(!productData_check) return false;
  productModel.findByIdAndUpdate(req.body.pd_id,productData,function(err,data){
    if (err) {
      var message = validate.getMessage(err);
      console.log(message);
    } else {
      console.log(data);
    }
  });


});


router.delete('/inventory/:id',function(req,res){
  inventoryModel.findByIdAndRemove(req.params.id,function(err,data){
    if(err) res.send(err);
    res.send("deleted");
  })
});


module.exports = router;
