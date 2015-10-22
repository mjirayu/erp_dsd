
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var supplierSchema = new Schema({
  code: String,
  name: String,
  delivery_day: Date,
  address: String,
  image: String,
  website: String,
  phone: String,
  fax: String,
  sale_person_name: String,
  sale_person_mobile: String,
  sale_person_email: String,
  status: String,
});


module.exports = mongoose.model('M_SUPPLIER', supplierSchema);
