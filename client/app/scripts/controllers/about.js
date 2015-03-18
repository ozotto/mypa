'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AboutCtrl', function ($scope, $window) {
    
   var promise = {
   'error':0,
   'nodes':[
      {
         'id':1,
         'label':'Peter Griffin'
      },
      {
         'id':2,
         'label':'Lois Pewterschmidt'
      },
      {
         'id':3,
         'label':'Chris Griffin'
      },
      {
         'id':4,
         'label':'Meg Griffin'
      },
      {
         'id':5,
         'label':'Stewie Griffin'
      },
      {
         'id':6,
         'label':'Brian Griffin'
      }
   ],
   'edges':[
      {
         'from':1,
         'to':2
      },
      {
         'from':1,
         'to':3
      },
      {
         'from':1,
         'to':4
      },
      {
         'from':1,
         'to':5
      },
      {
         'from':1,
         'to':6
      },
      {
         'from':5,
         'to':6
      }
   ],
   'options':{
      'width':'100%',
      'height':'600px'
   }
   };
   $scope.graph = {error: promise.error, data: {nodes: promise.nodes, edges: promise.edges}, options: promise.options};
   
    $scope.callbackFunction = function(params) {
      $window.alert( angular.toJson(params) );
   };


//CALENDAR

  // Disable weekend selection
  /*$scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
*/
   $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };


  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];


  $scope.isSelectCalendar = false;
  $scope.openCalendar = function(){
      $scope.isSelectCalendar = true;
  }

  $scope.$watch('dt',
    function(newValue, oldValue){
           $scope.isSelectCalendar = false;
  });






















  });
