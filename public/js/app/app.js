'use strict';

// MODULE App
var app = angular.module('app', [
  'ngRoute',
  'controllers',
  'services',
  'filters'
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
        }
      }
    })
    .when('/:id', {
      templateUrl: 'js/app/templates/restaurantDetails.html',
      controller: 'restaurantDetailsController',
      controllerAs: 'vm',
      resolve: {
        data: ['$route', 'restaurantsService', function($route, restaurantsService) {
          return restaurantsService.getRestaurantDetails($route.current.params.id);
        }]
      }
    })
    .otherwise({template: 'Error finding route'});
});
