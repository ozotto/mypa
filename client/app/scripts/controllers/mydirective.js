'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('mydirective', function ($scope) {
    $scope.variableChange = "test Change"

    $scope.callDirective = function(){
      alert("from controller");
    };

    $scope.customer = {
      name: 'Naomi',
      address: '1600 Amphitheatre'
    };

    $scope.loadMoreTweets = function () {
      alert("Loading tweets!");
      $scope.variableChange = "variable changed"
      $scope.$apply();
    };

    $scope.clicked = false;
    $scope.click = function() {
      $scope.clicked = !$scope.clicked;
      console.log('from click');
    };

  });

angular.module('clientApp')
  .directive('myCustomer', function () {
    return {
        template: 'Name: {{customer.name}}<br /> Street: {{customer.address}}'
    };
  });

angular.module('clientApp')
  .directive('myDirective', function () {
    return {
        link: function ($scope, element, attrs) {
            element.bind('click', function () {
                element.html('You clicked me!');
                element.css('background-color', 'red');
            });
            element.bind('mouseenter', function () {
                element.css('background-color', 'yellow');
            });
            element.bind('mouseleave', function () {
                element.css('background-color', 'white');
            });
        }
    };
});

angular.module('clientApp')
  .directive("enter", function () {
  return function (scope, element, attrs) {
    element.bind("click", function () {
      scope.loadMoreTweets();
    });
  }
});  

angular.module('clientApp')
  .directive('comunication', function () {
    return {
      restrict: 'E',
      scope: {
        clicked:   '='
      },
      link: function(scope, element, attrs ) {
        scope.$watch('clicked', function() {
          //console.log('innerFunc called'+scope.clicked);
          //alert("hello");
        })
      }
    };
});  


