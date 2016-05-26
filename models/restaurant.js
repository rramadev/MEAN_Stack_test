var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
  desc: String,
  country: String,
  emp: Number
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
