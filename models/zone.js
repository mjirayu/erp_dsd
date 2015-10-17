var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zoneSchema = new Schema({
  zone_type: String,
  zone_code: String,
  zone_name: String,
  zone_desc: String
});


module.exports = mongoose.model('Zone', zoneSchema);
