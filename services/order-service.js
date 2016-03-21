var Restaurant = require('../models/restaurant');
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
