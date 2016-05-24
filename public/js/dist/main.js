(function() {
'use strict';

// MODULE App
var app = angular.module('app', [
  'ngRoute',
  'ngDialog',
  'controllers',
  'services',
  'filters',
  'directives'
]);

// APP routeProvider
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'js/app/templates/restaurants.html',
      controller: 'restaurantsController',
      controllerAs: 'vm',
      resolve: {
        data: function(restaurantsService) {
          return restaurantsService.getRestaurants();
        },
        data2: function(restaurantsService) {
          return restaurantsService.orderService.orderRestaurants;
        }
      }
    })
    .when('/restaurant/:id', {
      templateUrl: 'js/app/templates/restaurantDetails.html',
      controller: 'restaurantDetailsController',
      controllerAs: 'vm',
      resolve: {
        data: ['$route', 'restaurantsService', function($route, restaurantsService) {
          return restaurantsService.getRestaurantDetails($route.current.params.id);
        }]
      }
    })
    .when('/payment', {
      templateUrl: 'js/app/templates/payment.html',
      controller: 'paymentController',
      controllerAs: 'vm'
    })
    .when('/confirmation', {
      templateUrl: 'js/app/templates/confirmation.html'
    })
    .otherwise({template: '<p>Error finding route</p><a href="#/"><< Back to Restaurants List</a>'});
});

})();

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

(function() {
'use strict';

// MODULE Directives
var directives = angular.module('directives', []);

// DIRECTIVE creditCard
directives.directive('creditCard', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$validators.creditCard = function(modelValue, viewValue) {
        if (!viewValue) {
          return true;
        }
        var len = viewValue.length,
          mul = 0,
          prodArr = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
          ],
          sum = 0;

        while (len--) {
          sum += prodArr[mul][parseInt(viewValue.charAt(len), 10)];
          mul ^= 1;
        }
        return sum % 10 === 0 && sum > 0;
      };
    }
  };
});

})();

(function() {
'use strict';

// MODULE Filters
var filters = angular.module('filters', []);

// FILTER capitalize
filters.filter('capitalize', function() {
  return function(input, scope) {
    if (input!==null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  };
});

})();

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
