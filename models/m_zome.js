var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zoneSchema = new Schema({
  zone_id: {
    type: String,
    unique: true
  },
  zone_type: String,
  zone_code: String,
  zone_name: String,
  zone_desc: String
});


module.exports = mongoose.model('M_ZONE', zoneSchema);
