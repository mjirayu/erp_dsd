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
  var message = [];
  productDB.find({}, function(err, collection) {
    if (collection.length == 0) {
      message.push({
        ErrorCode: -1,
        ErrorMessage: 'Data not found',
      });
    }

    if (message.length == 0) {
      res.json(collection);
    } else {
      res.send(message);
    }

  });
});

router.post('/', upload.single('image'), function(req, res, next) {
  var today = dateFunction.getDate();
  var message = [];

  data = {};
  data.pd_id = req.body.pd_id;
  data.pd_name =  req.body.pd_name;
  data.pd_type = req.body.pd_type;
  data.pd_status = req.body.pd_status;
  data.update_date = today;
  data.update_by = 'dev';

  if (data.pd_id == '' || data.pd_name == '' || data.pd_type == '' || data.pd_status == '') {
    message.push({
      ErrorCode: 1,
      ErrorMessage: 'productItem is null.',
    });
  }

  if (validate.checkFormat(data.pd_id, 'PD') == false) {
    message.push({
      ErrorCode: 2,
      ErrorMessage: 'productCode is not in correct format.',
    });
  }

  if (req.file === undefined) {
    data.image = 'product_prototype.jpg';
  } else {
    data.image = req.file.filename;
  }

  if (message.length == 0) {
    productDB.create(data, function(err, data) {
      res.send(data);
    });
  } else {
    res.send(message);
  }

});

router.put('/:id', upload.single('pd_img'), function(req, res, next) {
  var today = dateFunction.getDate();
  var message = [];

  if (req.body.pd_id == '' || req.body.pd_name == '' || req.body.pd_type == '' || req.body.pd_status == '') {
    message.push({
      ErrorCode: 1,
      ErrorMessage: 'productItem is null.',
    });
  }

  if (validate.checkFormat(req.body.pd_id, 'PD') == false) {
    message.push({
      ErrorCode: 2,
      ErrorMessage: 'productCode is not in correct format.',
    });
  }

  if (req.file === undefined) {
    image = req.body.image;
  } else {
    image = req.file.filename;
  }

  if (message.length == 0) {
    productDB.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          'pd_id': req.body.pd_id,
          'pd_name':  req.body.pd_name,
          'pd_type': req.body.pd_type,
          'pd_status': req.body.pd_status,
          'image': image,
          'update_date': today,
        },
      },
      function(err, data) {
        res.send('Success');
      }
    );
  } else {
    res.send(message);
  }
});

router.get('/search', function(req, res, next) {
  var message = [];
  var params = req.query;
  var pd_id = new RegExp(params.pd_id, 'i');
  var pd_status = new RegExp(params.pd_status, 'i');
  var pd_name = new RegExp(params.pd_name, 'i');

  productDB
    .find({
      pd_id: { $regex: pd_id },
      pd_status: { $regex: pd_status },
      pd_name: { $regex: pd_name },
    })
    .exec(function(err, collection) {
      if (collection.length == 0) {
        message.push({
          ErrorCode: -1,
          ErrorMessage: 'Data not found',
        });
        res.send(message);
      } else {
        res.send(collection);
      }
    });
});

router.get('/:id', function(req, res, next) {
  var message = [];
  productDB.findById(req.params.id, function(err, data) {
    if (data === undefined) {
      message.push({
        ErrorCode: -1,
        ErrorMessage: 'Data not found',
      });
    }

    if (message.length != 0) {
      res.send(message);
    } else {
      res.json(data);
    }
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
