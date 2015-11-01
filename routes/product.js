var express = require('express');
var router = express.Router();
var multer  = require('multer');

// Models
var productDB = require('./../models/m_product');

// Helpers
var dateFunction = require('./../helpers/date');
var validate = require('./../helpers/validate');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + '/../public/uploads');
  },

  filename: function(req, file, cb) {
    var lastfilename = '';
    if (file.mimetype == 'image/jpeg') {
      lastfilename = '.jpg';
    } else if (file.mimetype == 'image/png') {
      lastfilename = '.png';
    } else {
      cb(new Error('Allow only JPG and PNG'));
    }

    cb(null, file.fieldname + '-' + Date.now() + lastfilename);
  },

  onFileUploadComplete: function(file, req, res) {
    var fileimage = file;
    req.middlewareStorage = {
      fileimage: fileimage,
    };
  },
});

var upload = multer({ storage: storage });

router.get('/', function(req, res, next) {
  productDB.find({}, function(err, collection) {
    res.json(collection);
  });
});

router.post('/', upload.single('image'), function(req, res, next) {
  var today = dateFunction.getDate();
  data = {};
  data.pd_id = req.body.pd_id;
  data.pd_name =  req.body.pd_name;
  data.pd_type = req.body.pd_type;
  data.pd_status = req.body.pd_status;
  data.safety_stock = req.body.safety_stock;
  data.update_date = today;
  data.update_by = 'User';

  if (req.file === undefined) {
    data.image = '';
  } else {
    data.image = req.file.filename;
  }

  productDB.create(data, function(err, data) {
    if (err) {
      var message = validate.required(err);
      res.send(message);
    }

    res.send(data);
  });

});

router.get('/:id', function(req, res, next) {
  productDB.findById(req.params.id, function(err, data) {
    res.json(data);
  });
});

router.delete('/:id', function(req, res, next) {
  productDB.findById(req.params.id, function(err, data) {
    data.remove(function(err) {
      if (err) {
        throw err;
      } else {
        res.send('Deleted');
      }
    });
  });
});

module.exports = router;
