var Restaurant = require('../models/restaurant');
var Order = require('../models/order');
var mongoose = require('mongoose');

exports.getRestaurants = function(next) {
  Restaurant.find(function(err, restaurants) {
    if (err) {
      return next(err, null);
    }
    next(null, restaurants);
  });
};

exports.getRestaurantDetails = function(restId, next) {
  var id = new mongoose.Types.ObjectId(restId);
  Restaurant.findOne({_id:id}, function(err, restDetails) {
    if (err) {
      return next(err, null);
    }
    next(null, restDetails);
  });
};

exports.createOrder = function(orderRestaurants, next) {
  // console.log("exports.createOrder : " + orderRestaurants);
  var order = new Order({
    orderRestaurants: orderRestaurants
  });
  order.save(function(err, savedOrder) {
    if (err) {
      return next(err, null);
    }
    next(null, savedOrder._id);
  });
};
