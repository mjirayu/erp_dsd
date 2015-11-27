var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var M_SUPPLIER = require('./m_supplier');

var poHeaderSchema = new Schema({
  po_id: {
    type: String,
    unique: 'po_id is required!',
    required: 'po_id is required!',
  },
  sp_id: {
    type: Schema.ObjectId,
    ref: 'M_SUPPLIER',
    required: 'sp_id is required!',
  },
  order_date: {
    type: String,
    required: 'order_date is required!',
  },
  expected_date: {
    type: String,
    required: 'expected_date is required!',
  },
  untaxed_total: {
    type: Number,
    // required: 'untaxed_total is required!',
  },
  total: {
    type: Number,
    required: 'total is required!',
  },
  po_status: {
    type: String,
    required: 'po_status is required!',
  },
  invoice_no: {
    type: String,
    required: 'invoice_no is required!',
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

poHeaderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('PO_HEADER', poHeaderSchema);
