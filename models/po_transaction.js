var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PO_HEADER = require('./po_header');
var M_PRODUCT = require('./m_product');

var poTransactionSchema = new Schema({
  po_id: {
    type: Schema.ObjectId,
    ref: 'PO_HEADER'
  },
  pd_id: {
    type: Schema.ObjectId,
    ref: 'M_PRODUCT'
  },
  quantity: Number,
  price: Number,
  update_date: Date,
  update_by: String
});


module.exports = mongoose.model('PO_TRANSACTION', poTransactionSchema);
