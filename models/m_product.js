var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  pd_id: {
    type: String,
  },
  pd_name: {
    type: String,
  },
  pd_status: {
    type: String,
  },
  pd_type: {
    type: String,
  },
  safety_stock: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    default: null,
  },
  image: {
    type: String,
  },
  update_date: {
    type: String,
  },
  update_by: {
    type: String,
  },
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('M_PRODUCT', productSchema);
