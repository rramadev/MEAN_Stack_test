(function() {
'use strict';

// MODULE Controllers
var controllers = angular.module('controllers', []);

// CONTROLLER restaurantsController
controllers.controller('restaurantsController', ['data', 'data2', 'restaurantsService', '$location', function(data, data2, restaurantsService, $location) {
  this.restaurants = data;
  this.orderRestaurants = data2;

  //Update the orderRestaurants list on service
  this.updateServiceOrders = function(orderRestaurants) {
    restaurantsService.orderService.setOrderRestaurants(orderRestaurants);
  };

  //Check if restaurants was already selected
  this.isChecked = function(id){
      var match = false;
      for(var i=0 ; i < this.orderRestaurants.length; i++) {
        if(this.orderRestaurants[i]._id == id){
          match = true;
        }
      }
      return match;
  };

  this.addRestaurant = function(rest) {
    var index = this.containsObject(rest, this.orderRestaurants);
    if (index > -1) {
      this.orderRestaurants.splice(index,1);
      this.updateServiceOrders(this.orderRestaurants);
      return;
    }
    this.orderRestaurants.push(rest);
    this.updateServiceOrders(this.orderRestaurants);
    // console.log(this.orderRestaurants);
  };

  this.saveOrder = function() {
    restaurantsService.createOrder(this.orderRestaurants)
    .then(function(data) {
      if(data.success) {
        // alert("Order Saved");
        $location.url("/payment");
        return;
      }
      alert("Something went wrong saving the order...");
    });
  };

  //Check if object exists already in array and return index
  this.containsObject = function(obj, list) {
    var i = 0;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return i;
        }
    }
    i = -1;
    return i;
  };

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
controllers.controller('restaurantDetailsController', ['data', 'ngDialog', '$scope', function(data, ngDialog, $scope) {
  this.restDetails = data;
  // Modal View of the selected Item
  this.viewItem = function(item) {
   this.activeItem = item;
   ngDialog.open({
     template: 'item.html',
     className: 'ngdialog-theme-default',
     scope: $scope
   });
   console.log("item: " + this.activeItem);
  };
}]);

// CONTROLLER paymentController
controllers.controller('paymentController', ['$location', function($location) {
  this.submit = function() {
    this.showProgress = true;
    $location.url("/confirmation");
  };
}]);

})();
