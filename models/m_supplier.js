
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var supplierSchema = new Schema({
  sp_id: {
    type: String,
    unique: true
  },
  code: {
    type: String,
    unique: true
  },
  name: String,
  delivery_day: Number,
  address: String,
  image: String,
  website: String,
  phone: String,
  fax: String,
  sale_person_name: String,
  sale_person_mobile: String,
  sale_person_email: String,
  status: String,
  date:Date
});


module.exports = mongoose.model('M_SUPPLIER', supplierSchema);
