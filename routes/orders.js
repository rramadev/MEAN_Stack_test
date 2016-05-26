var express = require('express');
var router = express.Router();
var orderService = require('../services/order-service');
var restrict = require('../auth/restrict');

/* GET /orders */
router.get('/', restrict, function(req, res, next) {
  // console.log("User: " + req.user);
  res.render('orders/index', {
    title: 'Place an order',
    firstName: req.user ? req.user.firstName :  null
  });
});

/* GET /orders/api/restaurants */
router.get('/api/restaurants', restrict, function(req, res, next) {
  orderService.getRestaurants(function(err, restaurants) {
    if (err) {
      return res.status(500).json('Failed to retrieve restaurants');
    }
    // console.log("routes/orders->/orders/restaurants : " + restaurants);
    res.json(restaurants);
  });
});

/* GET /orders/api/restaurants/:restId */
router.get('/api/restaurants/:restId', restrict, function(req, res, next) {
  orderService.getRestaurantDetails(req.params.restId, function(err, restDetails) {
    if (err) {
      return res.status(500).json('Failed to retrieve details');
    }
    // console.log("routes/orders->/orders/restaurants : " + restaurants);
    res.json(restDetails);
  });
});

/* POST /orders/api/create-order */
router.post('/api/create-order', restrict, function(req, res, next) {
  orderService.createOrder(req.user, req.body, function(err, savedOrderId) {
    if (err) {
      return res.status(500).json('Failed to create order');
    }
    req.session.orderId = savedOrderId;
    res.json({success: true, savedOrderId: savedOrderId});
  });
});

/* POST /orders/api/payment-order */
router.post('/api/payment-order', restrict, function(req, res, next) {
  orderService.paymentOrder(req.body, function(err, result) {
    if (err) {
      return res.status(500).json('Failed to update order');
    }
    res.json({success: true});
  });
});

module.exports = router;
