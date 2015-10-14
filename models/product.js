var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({
  supplier_id:String,
  product_type: String,
  product_code: String,
  product_name: String,
  product_status: String,
  product_image: String,
  product_date: Date
});


module.exports = mongoose.model('Product', productSchema);
