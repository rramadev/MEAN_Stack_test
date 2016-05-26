(function() {
'use strict';

// MODULE Services
var services = angular.module('services', []);

// SERVICE restaurantsService
services.factory('restaurantsService', ['$http', '$location', function($http, $location) {
  // Data shared between Controllers
  var orderService = {
    orderRestaurants: [],
    savedOrderId: ''
  };

  return {
    orderService: orderService,
    getRestaurants: function () {
      return $http.get('/orders/api/restaurants').
        then(function(response) {
          return response.data;
        },
        function(error) {
          console.log(error  + "Service - Error finding restaurants list");
          $location.url('/error');
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getRestaurantDetails: function (restId) {
      return $http.get('/orders/api/restaurants/' + restId).
        then(function(response) {
          return response.data;
        },
        function(error) {
          console.log(error + "Service - Error finding restaurant details");
          $location.url('/error');
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    createOrder: function (orderRestaurants) {
      return $http.post('/orders/api/create-order', orderRestaurants).
        then(function(response) {
          return response.data;
        },
        function(error) {
          console.log("Service - Error creating order, %o", error);
          return error;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    paymentOrder: function (savedOrderId) {
      return $http.post('/orders/api/payment-order', savedOrderId).
        then(function(response) {
          return response.data;
        },
        function(error) {
          console.log("Service - Error updating order, %o", error);
          return error;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    setOrderRestaurants: function (orderRestaurants) {
      orderService.orderRestaurants = orderRestaurants;
    },
    getOrderRestaurants: function () {
      return orderService.orderRestaurants;
    },
    setSavedOrderId: function (savedOrderId) {
      orderService.savedOrderId = savedOrderId;
    },
    getSavedOrderId: function () {
      return orderService.savedOrderId;
    },
  };
}]);

})();
