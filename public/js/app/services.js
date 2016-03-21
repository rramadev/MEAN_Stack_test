'use strict';

// MODULE Services
var services = angular.module('services', []);

// SERVICE restaurantsService
services.factory('restaurantsService', ['$http', function($http) {
  return {
    getRestaurants: function () {
      return $http.get('orders/restaurants').
        then(function(response) {
          return response.data;
        },
        function(error) {
          console.log(error);
        });
    },
    getRestaurantDetails: function (restId) {
      return $http.get('orders/restaurants/' + restId).
        then(function(response) {
          return response.data;
        },
        function(error) {
          console.log(error);
        });
    }
  };
}]);
