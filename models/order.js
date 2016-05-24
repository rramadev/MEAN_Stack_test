var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  ordernum: String,
  created: {type: Date, default: Date.now},
  orderRestaurants: []
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
