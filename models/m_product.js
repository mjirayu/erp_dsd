var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  pd_id: {
    type: String,
    unique: 'This pd_id is already exist',
    required: 'pd_id is null.',
  },
  pd_name: {
    type: String,
    required: 'pd_name is null.',
  },
  pd_status: {
    type: String,
    required: 'pd_status is null.',
  },
  pd_type: {
    type: String,
    required: 'pd_type is null.',
  },
  safety_stock: {
    type: Number,
    required: 'safety_stock is null.',
  },
  unit: {
    type: String,
    required: 'unit is null.',
  },
  image: {
    type: String,
    required: 'image is null.',
  },
  update_date: {
    type: String,
    required: 'update_date is null.',
  },
  update_by: {
    type: String,
    required: 'update_by is null.',
  },
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('M_PRODUCT', productSchema);
