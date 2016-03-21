'use strict';

// MODULE Controllers
var controllers = angular.module('controllers', []);

// CONTROLLER restaurantsController
controllers.controller('restaurantsController', ['data', function(data) {
   this.restaurants = data;

  // restaurantsService.get().
  //   then(function(d) {
  //     this.restaurants = d;
  //   });

  // var vm = this;
  // $http.get('orders/restaurants').
  //   then(function(response) {
  //     vm.restaurants = response.data;
  //   },
  //   function(error) {
  //     console.log(error);
  //   });
}]);

// CONTROLLER restaurantDetailsController
controllers.controller('restaurantDetailsController', ['data', function(data) {
  //  console.log("js/app/controllers.js-> this.restDetails: %o",data);
   this.restDetails = data;
}]);
