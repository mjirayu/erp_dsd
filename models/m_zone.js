var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zoneSchema = new Schema({
  zone_id: {
    type: String,
    unique: 'This zone_id is already exist',
    required: 'zone_id is required!'
  },
  zone_type: {
    type: String,
    required: 'zone_type is required!',
  },
  zone_name: {
    type: String,
    required: 'zone_name is required!',
  },
  zone_desc: {
    type: String,
    required: 'zone_desc is required!',
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


module.exports = mongoose.model('M_ZONE', zoneSchema);
