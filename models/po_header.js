var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poHeaderSchema = new Schema({
  po_id: {
    type: String,
    unique: true
  },
  sp_id: {
    type: Schema.ObjectId,
    ref: 'm_supplier'
  },
  order_date: Date,
  expected_date: Date,
  untaxed_total: Number,
  total: Number,
  po_status: String,
  invoice_no: String,
  update_date: Date,
  update_by: String
});


module.exports = mongoose.model('PO_HEADER', poHeaderSchema);