var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema({
  pd_id: {
    type: Schema.ObjectId,
    ref: 'M_PRODUCT',
    required: 'pd_id is required!',
  },
  quantity: {
    type: Number,
    required: 'quantity is required!',
  },
  zone_id: {
    type: Schema.ObjectId,
    ref: 'M_ZONE',
    required: 'zone_id is required!',
  },
  update_date: {
    type: String,
    required: 'update_date is required!',
  },
  update_by: {
    type: String,
    required: 'update_by is required!',
  }
});


module.exports = mongoose.model('INVENTORY', inventorySchema);
