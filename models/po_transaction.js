var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PO_HEADER = require('./po_header');
var M_PRODUCT = require('./m_product');

var poTransactionSchema = new Schema({
  po_id: {
    type: Schema.ObjectId,
    ref: 'PO_HEADER',
    required: 'po_id is required!',
  },
  pd_id: {
    type: Schema.ObjectId,
    ref: 'M_PRODUCT',
    required: 'pd_id is required!',
  },
  quantity: {
    type: Number,
    required: 'quantity is required!',
  },
  price: {
    type: Number,
    required: 'price is required!',
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

module.exports = mongoose.model('PO_TRANSACTION', poTransactionSchema);
