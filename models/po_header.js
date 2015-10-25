var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var M_SUPPLIER = require('./m_supplier');

var poHeaderSchema = new Schema({
  po_id: {
    type: String,
    unique: true
  },
  sp_id: {
    type: Schema.ObjectId,
    ref: 'M_SUPPLIER'
  },
  order_date: String,
  expected_date: Date,
  untaxed_total: Number,
  total: Number,
  po_status: String,
  invoice_no: String,
  update_date: Date,
  update_by: String
});


module.exports = mongoose.model('PO_HEADER', poHeaderSchema);
