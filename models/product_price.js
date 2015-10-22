var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var priceSchema = new Schema({
  sp_id: {
    type: Schema.ObjectId,
    ref: 'M_SUPPLIER'
  },
  pd_id:{
    type: Schema.ObjectId,
    ref: 'm_product'
  },
  pd_price: String,
  minimun_order: Number,
  effective_date: Date,
  update_date: Date,
  update_by: String
});


module.exports = mongoose.model('product_price', priceSchema);
