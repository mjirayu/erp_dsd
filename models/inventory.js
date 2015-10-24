var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema({
  pd_id: {
    type: Schema.ObjectId,
    ref: 'M_PRODUCT'
  },
  quantity: Number,
  zone_id: {
    type: Schema.ObjectId,
    ref: 'M_ZONE'
  },
  update_date: Date,
  update_by: String
});


module.exports = mongoose.model('INVENTORY', inventorySchema);
