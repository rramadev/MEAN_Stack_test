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
  var rid = new mongoose.Types.ObjectId(restId);
  Restaurant.findOne({_id:rid}, function(err, restDetails) {
    if (err) {
      return next(err, null);
    }
    next(null, restDetails);
  });
};

exports.createOrder = function(user, orderRestaurants, next) {
  // console.log("exports.createOrder : " + orderRestaurants);
  var order = new Order({
    user: {
      email: user.email,
      roomNumber: user.roomNumber
    },
    orderRestaurants: orderRestaurants
  });
  order.save(function(err, savedOrder) {
    if (err) {
      return next(err, null);
    }
    next(null, savedOrder._id);
  });
};

exports.paymentOrder = function(savedOrderId, next) {
  var soid = new mongoose.Types.ObjectId(savedOrderId.savedOrderId);
  Order.update( {_id: soid} , { $set: {payment: true}},
  function(err, result) {
    if (err) {
      return next(err, null);
    }
    next(null, result);
  });
};
