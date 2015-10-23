var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema({
  pd_id: {
    type: Schema.ObjectId,
    ref: 'M_PRODUCT'
  },
  quantity: Number,
  update_date: Date,
  update_by: String
});


module.exports = mongoose.model('Inventory', inventorySchema);
