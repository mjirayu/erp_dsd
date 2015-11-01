var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var M_SUPPLIER = require('./m_supplier');

var poHeaderSchema = new Schema({
  po_id: {
    type: String,
    unique: 'order_date is required!',
    required: 'po_id is required!',
  },
  sp_id: {
    type: Schema.ObjectId,
    ref: 'M_SUPPLIER',
    required: 'sp_id is required!',
  },
  order_date: {
    type: String,
    require: 'order_date is required!',
  },
  expected_date: {
    type: String,
    require: 'expected_date is required!',
  },
  untaxed_total: {
    type: Number,
    require: 'untaxed_total is required!',
  },
  total: {
    type: Number,
    require: 'total is required!',
  },
  po_status: {
    type: String,
    require: 'po_status is required!',
  },
  invoice_no: {
    type: String,
    require: 'invoice_no is required!',
  },
  update_date: {
    type: String,
    require: 'update_date is required!',
  },
  update_by: {
    type: String,
    require: 'update_by is required!',
  },
});

module.exports = mongoose.model('PO_HEADER', poHeaderSchema);
