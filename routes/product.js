var express = require('express');
var router = express.Router();
var productDB = require('./../models/product');
var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/../public/uploads')
    },
    filename: function (req, file, cb) {
        var lastfilename = "";
        if(file.mimetype=="image/jpeg"){
          lastfilename = ".jpg";
        }else if(file.mimetype=="image/png"){
          lastfilename = ".png";
        }else{
          cb(new Error('Allow only JPG and PNG'))
        }
        cb(null, file.fieldname + '-' + Date.now()+lastfilename);
    },
    onFileUploadComplete: function (file, req, res) {
        var fileimage = file;
        console.log(file);
        req.middlewareStorage = {
          fileimage : fileimage//,
          //otherKey : otherValue
        }
      }
});

var upload = multer({ storage: storage });

router.get('/', function(req, res, next) {
  res.send('all product');
});

router.get('/:id', function(req, res, next) {
  productDB.findById(req.params.id, function (err, data) {
    res.send(data);
  });

});

router.post('/', upload.single('product_image'), function(req, res, next) {
  data = {};
  data.product_name =  req.body.product_name;
  data.product_type = req.body.product_type;
  data.product_status = req.body.product_status;
  data.product_code = req.body.product_code;
  data.product_date = Date();
  data.product_image = "defalse pic";
  if(req.file == undefined){
    data.product_image =="asdf";
  }else{
    data.product_image = req.file.filename;
  }

  for(item in data){
    console.log(item + " is "+data[item]);
    if(data[item] == undefined || data[item] == ""){
      res.send(item + " is undefined");
      break;
    }
  }
  productDB.create(data,function(err,data){
      res.send(data);
  });

});

router.post('/:id', function(req, res, next) {
  console.log('Post Product :'+req.params.id);
});

router.delete('/:id', function(req, res, next) {
  productDB.findById(req.params.id, function(err, data){
    data.remove(function(err) {
      if(err) {
        throw err;
      } else {
        res.redirect('/product');
      }
    });
  });
});

module.exports = router;
