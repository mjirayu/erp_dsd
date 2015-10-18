var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema({
  product: {
    type: Schema.ObjectId,
    ref: 'Product'
  },
  quantity: Number
});


module.exports = mongoose.model('Inventory', inventorySchema);
