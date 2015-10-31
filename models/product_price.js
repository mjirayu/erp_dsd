var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var M_SUPPLIER = require('./m_supplier');
var M_PRODUCT = require('./m_product');

var priceSchema = new Schema({
  sp_id: {
    type: Schema.ObjectId,
    ref: 'M_SUPPLIER'
  },
  pd_id:{
    type: Schema.ObjectId,
    ref: 'M_PRODUCT'
  },
  pd_price: String,
  minimun_order: Number,
  effective_date: Date,
  update_date: Date,
  update_by: String
});


module.exports = mongoose.model('product_price', priceSchema);
