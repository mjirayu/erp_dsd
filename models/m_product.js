var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  pd_id: {
    type: String,
    unique: true,
    required: 'pd_id is required!',
  },
  pd_name: {
    type: String,
    required: 'pd_name is required!',
  },
  pd_status: {
    type: String,
    required: 'pd_status is required!',
  },
  pd_type: {
    type: String,
    required: 'pd_type is required!',
  },
  safety_stock: {
    type: Number,
    required: 'safety_stock is required!',
  },
  unit: {
    type: String,
    required: 'unit is required!',
  },
  image: {
    type: String,
    required: 'image is required!',
  },
  update_date: {
    type: String,
    required: 'update_date is required!',
  },
  update_by: {
    type: String,
    required: 'update_by is required!',
  },
});

module.exports = mongoose.model('M_PRODUCT', productSchema);
