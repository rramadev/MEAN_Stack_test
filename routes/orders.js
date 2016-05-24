var express = require('express');
var router = express.Router();
var orderService = require('../services/order-service');

/* GET /orders */
router.get('/', function(req, res, next) {
  res.render('orders/index', {
    title: 'Place an order'
  });
});

/* GET /orders/restaurants */
router.get('/restaurants', function(req, res, next) {
  orderService.getRestaurants(function(err, restaurants) {
    if (err) {
      return res.status(500).json('Failed to retrieve restaurants');
    }
    // console.log("routes/orders->/orders/restaurants : " + restaurants);
    res.json(restaurants);
  });
});

/* GET /orders/restaurants/:restId */
router.get('/restaurants/:restId', function(req, res, next) {
  orderService.getRestaurantDetails(req.params.restId, function(err, restDetails) {
    if (err) {
      return res.status(500).json('Failed to retrieve details');
    }
    // console.log("routes/orders->/orders/restaurants : " + restaurants);
    res.json(restDetails);
  });
});

/* POST /orders/create-order */
router.post('/create-order', function(req, res, next) {
  orderService.createOrder(req.body, function(err, savedOrderId) {
    if (err) {
      return res.status(500).json('Failed to create order');
    }
    res.json({success: true});
  });
});

module.exports = router;
