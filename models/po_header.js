var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var M_SUPPLIER = require('./m_supplier');

var poHeaderSchema = new Schema({
  po_id: {
    type: String,
  },
  sp_id: {
    type: Schema.ObjectId,
    ref: 'M_SUPPLIER',
  },
  order_date: {
    type: String,
  },
  expected_date: {
    type: String,
    default: null,
  },
  untaxed_total: {
    type: Number,
  },
  total: {
    type: Number,
  },
  po_status: {
    type: String,
  },
  invoice_no: {
    type: String,
  },
  update_date: {
    type: String,
  },
  update_by: {
    type: String,
  },
});

poHeaderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('PO_HEADER', poHeaderSchema);
