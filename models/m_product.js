var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  pd_id: String,
  pd_name: String,
  pd_status: String,
  pd_type: String,
  safety_stock: String,
  unit: String,
  image: String,
  update_date: Date,
  update_by: String,
});


module.exports = mongoose.model('M_PRODUCT', productSchema);
