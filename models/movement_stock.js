
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movementSchema = new Schema({
  movement_id: {
    type: String,
    unique: 'This movement_id is already exist',
    required: 'movement_id is required!',
  },
  pd_id: {
    type: Schema.ObjectId,
    ref: 'M_PRODUCT',
    required: 'pd_id is required!',
  },
  movement_type: {
    type: String,
    required: 'movement_type is required!',
  },
  quantity: {
    type: Number,
    required: 'quantity is required!',
  },
  ref_po_id: {
    type: String,
    required: 'ref_po_id is required!',
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


module.exports = mongoose.model('MOVEMENT_STOCK', movementSchema);
