var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movementSchema = new Schema({
  movement_id: {
    type: String,
    unique: true
  },
  pd_id: {
    type: Schema.ObjectId,
    ref: 'M_PRODUCT'
  },
  movement_type: String,
  quantity: Number,
  ref_po_id: String,
  update_date: Date,
  update_by: String
});


module.exports = mongoose.model('MOVEMENT_STOCK', movementSchema);
