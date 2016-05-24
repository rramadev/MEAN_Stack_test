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
