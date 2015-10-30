var express = require('express');
var router = express.Router();
var priceDB = require('./../models/product_price');
var supplierDB = require('./../models/m_supplier');
router.post('/',function(req,res){
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

router.get('/',function(req,res){
  priceDB.find({})
  .populate('sp_id')
  .populate('pd_id')
  .exec(function(err,data){
    if(err) res.send(err);
    res.send(data);
  });
});
router.get('/search',function(req,res){

  var params = req.query;
  var gte = params.gte || 0;
  var lte = params.lte || 999999999999999;
  var sp_code = new RegExp(params.sp_code, 'i');
  var sp_name = new RegExp(params.sp_name, 'i');
  var pd_code = new RegExp(params.pd_code, 'i');
  var pd_name = new RegExp(params.pd_name, 'i');
  var date_start = params.date_start ? new Date(params.date_start) : new Date(1900,1,1);
  var date_stop = params.date_stop ? new Date(params.date_stop) : new Date(2020,1,1);

  priceDB.find({pd_price:{$gte:gte,$lte:lte},effective_date:{$gte:date_start,$lte: date_stop}})
  .populate('sp_id' ,null, { code: { $regex: sp_code }, name: { $regex: sp_name }})
  .populate('pd_id' ,null, { code: { $regex: pd_code }, name: { $regex: pd_name }})
  .where('sp_id').ne(null)
  .exec(function(err,collection){
    if(err) res.send(err);
    data = collection.filter(function(item){
      if(item.sp_id == null) return false;
      if(item.pd_id == null) return false;
      return true;
    }).map( function(item) {
      return item;
    });
    res.send(data);
  });

});

router.get('/:id',function(req,res){
  priceDB.findById(req.params.id)
  .populate('sp_id')
  .populate('pd_id')
  .exec(function(err,data){
    if(err) res.send(err);
    res.send(data);
  });
});



router.delete('/:id',function(req,res){
  priceDB.findByIdAndRemove(req.params.id,function(err,data){
    if(err) res.send(err);
    res.send("deleted");
  });

});

router.put('/:id',function(req,res){
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
