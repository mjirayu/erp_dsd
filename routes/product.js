var express = require('express');
var router = express.Router();
var productDB = require('./../models/m_product');
var multer  = require('multer');

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
      }
});

var upload = multer({ storage: storage });

router.get('/', function(req, res, next) {
  productDB.find({}, function(err, collection) {
    res.json(collection);
  });
});

router.post('/', upload.single('image'), function(req, res, next) {
  data = {};
  data.pd_id = req.body.pd_id;
  data.pd_name =  req.body.pd_name;
  data.pd_type = req.body.pd_type;
  data.pd_status = req.body.pd_status;
  data.update_date = Date();
  data.update_by = 'User';
  data.image = "defalse pic";
  if(req.file === undefined) {
    data.product_image = "asdf";
  }else{
    data.product_image = req.file.filename;
  }

  for(var item in data) {
    console.log(item + " is "+data[item]);
    if(data[item] === undefined || data[item] === "") {
      res.send(item + " is undefined");
      break;
    }
  }
  productDB.create(data,function(err,data){
    if(err) res.send(err);
    res.send(data);
  });

});

router.get('/:id', function(req, res, next) {
  productDB.findById(req.params.id, function (err, data) {
    res.json(data);
  });
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
