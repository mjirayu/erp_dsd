var express = require('express');
var router = express.Router();
var supplierDB = require('./../models/m_supplier');
var multer  = require('multer');
var fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/../public/uploads');
    },
    filename: function (req, file, cb) {
        var lastfilename = "";
        if(file.mimetype=="image/jpeg"){
          lastfilename = ".jpg";
        }else if(file.mimetype=="image/png"){
          lastfilename = ".png";
        }else{
          cb(new Error('Allow only JPG and PNG'));
        }
        cb(null, file.fieldname + '-' + Date.now()+lastfilename);
    },
    onFileUploadComplete: function (file, req, res) {
        var fileimage = file;
        console.log(file);
        req.middlewareStorage = {
          fileimage : fileimage,
        };
      },
    onError: function(err,next){
      next();
    }
});

var upload = multer({ storage: storage });
var updatelogo = upload.single('logo');
router.post('/',function(req,res){
  updatelogo(req,res, function(err){
    data = {};
    data.sp_id = req.body.sp_id;
    data.code =  req.body.code;
    data.name = req.body.name;
    data.delivery_day = req.body.delivery_day;
    data.address = req.body.address;
    try {
      data.image = req.file.filename;
      havenewlogo = true;
    }
    catch(err) {
        data.image = 'default.png';
    }

    data.website =  req.body.website;
    data.phone = req.body.phone;
    data.fax = req.body.fax;
    data.sale_person_name = req.body.sale_person_name;
    data.sale_person_mobile = req.body.sale_person_mobile;
    data.sale_person_email = req.body.sale_person_email;
    data.status = req.body.status;
    data.date = new Date();

    data_check = true;
    if(data.delivery_day == "" || data.delivery_day == "Invalid Date") {
      res.send("Invalid Date");
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
    if(!data_check){
      fs.unlink('public/uploads/'+req.file.filename, function (err) {
        if (err) throw err;
        console.log('successfully deleted /tmp/hello');
      });

      return false;

    }
    supplierDB.create(data,function(err,data){
      if(err){
        res.send(err);
      }else{
        res.send({status:'successfully',data:data});
      }
    });

  });


});

router.get('/',function(req,res){
  supplierDB.find({},function(err,data){
    if(err) res.send(err);
    res.send(data);
  })
});

router.get('/search',function(req,res){
  var params = req.query;
  var sp_code = new RegExp(params.code, 'i');
  var sp_name = new RegExp(params.name, 'i');
  var sp_status = new RegExp(params.status, 'i');
  supplierDB.find({
    code: { $regex: sp_code},
    name: { $regex: sp_name},
    status: { $regex: sp_status}
  }).exec(function(err, collection) {
    res.send(collection);
  });;
});

router.get('/:id',function(req,res){
  supplierDB.findById(req.params.id,function(err,data){
    if(err) res.send(err);
    res.send(data);
  })
});

router.delete('/:id',function(req,res){
  supplierDB.findByIdAndRemove(req.params.id,function(err,data){
    if(err) res.send(err);
    res.send("deleted");
  })
});

router.put('/:id',function(req,res){
  updatelogo(req,res, function(err){
    data = {};
    data.sp_id = req.body.sp_id;
    data.code =  req.body.code;
    data.name = req.body.name;
    data.delivery_day = req.body.delivery_day;
    data.address = req.body.address;
    havenewlogo = false;
    try {
      data.image = req.file.filename;
      havenewlogo = true;
    }
    catch(err) {
        console.log("Have no new image!!!");
    }

    data.website =  req.body.website;
    data.phone = req.body.phone;
    data.fax = req.body.fax;
    data.sale_person_name = req.body.sale_person_name;
    data.sale_person_mobile = req.body.sale_person_mobile;
    data.sale_person_email = req.body.sale_person_email;
    data.status = req.body.status;
    data.date = new Date();

    data_check = true;
    if(data.delivery_day == "" || data.delivery_day == "Invalid Date"){
      res.send("Invalid Date");
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

    supplierDB.findByIdAndUpdate(req.params.id,data,function(err,data){
      if(err){
        res.send(err);
      }else{
        if(havenewlogo){
          fs.unlink('public/uploads/'+data.image, function (err) {
            if (err) throw err;
            console.log('successfully deleted');
          });
        }
        res.send({status:'successfully',data:data});
      }
    });
  });

});


module.exports = router;
