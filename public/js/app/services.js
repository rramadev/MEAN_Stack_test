(function() {
'use strict';

// MODULE Services
var services = angular.module('services', []);

// SERVICE restaurantsService
services.factory('restaurantsService', ['$http', '$location', function($http, $location) {
  var orderService = {};
  orderService.orderRestaurants = [];
  orderService.setOrderRestaurants = function(orderRestaurants) {
    this.orderRestaurants = orderRestaurants;
    console.log("orderService set %o" ,orderService.orderRestaurants);
  };

  return {
    orderService: orderService,
    getRestaurants: function () {
      return $http.get('/orders/restaurants').
        then(function(response) {
          return response.data;
        },
        function(error) {
          console.log(error  + "Service - Error finding restaurants list");
          $location.url('/error');
        });
    },
    getRestaurantDetails: function (restId) {
      return $http.get('/orders/restaurants/' + restId).
        then(function(response) {
          return response.data;
        },
        function(error) {
          console.log(error + "Service - Error finding restaurant details");
          $location.url('/error');
        });
    },
    createOrder: function (orderRestaurants) {
      return $http.post('/orders/create-order', orderRestaurants).
        then(function(response) {
          return response.data;
        },
        function(error) {
          console.log("Service - Error creating order, %o", error);
          return error;
        });
    }
  };
}]);

})();
