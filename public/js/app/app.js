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
