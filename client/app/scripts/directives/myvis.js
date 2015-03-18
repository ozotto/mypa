'use strict';

var ngVis2 = angular.module('ngVis2', []);

ngVis2.factory('visSetData', function () {
  return function (data) {
    var processed;
    var items = new vis.DataSet({
      type: {
        start: 'ISODate',
        end: 'ISODate'
      }
    });

    var groups = new vis.DataSet();

    // TODO: is this checking for `type` needed? (is also done by the Timeline itself)
    var regulate = function (items) {
      angular.forEach(items, function (item) {
        if (!item.hasOwnProperty('type')) {
          item.type = (item.hasOwnProperty('end')) ? 'range' : 'box';
        } else {
          if (item.type == 'range' && !item.hasOwnProperty('end')) {
            item.type = 'box';
            console.warn('One of the timeline items has been labeled as "range" but no "end" specified!');
          }
        }
      });

      return items;
    };

    if (angular.isArray(data)) {
      items.clear();
      items.add(regulate(data));

      processed = {
        load: items,
        single: true
      };
    } else if (angular.isObject(data) && data.hasOwnProperty('groups')) {
      groups.clear();
      items.clear();
      groups.add(data.groups);
      items.add(regulate(data.items));

      processed = {
        load: {
          groups: groups,
          items: items
        },
        single: false
      };
    }

    return processed;
  }
});

ngVis2.directive('vis2', function () {
  return {
    restrict: 'EA',
    controller: function ($scope, $timeout) {
      this.setTimeline = function (timeline) {
        this.timeline = $scope.timeline = timeline;

        $scope.range = timeline.getWindow();

        timeline.on('rangechange', function (properties) {
          $timeout(function () {
            $scope.range = properties
          });
        });
      };
    },
    link: function ($scope, element, attr) {

    }
  }
});
/*
ngVis2.directive('navegationTime', function() {
  return
});
*/
ngVis2.directive('timeLineas', function () {
  return {
    restrict: 'EA',
    require: '^vis2',    
    scope: {
      data: '=',
      options: '=',
      events: '='
    },
    link: function (scope, element, attr, visCtrl) {
      //console.log("hello from myvis");

      scope.mynew = function(){
          alert("salut mon ami");
      };


      var timeline = new vis.Timeline(element[0]);

      scope.$watch('data', function () {
        timeline.clear({options: true});
        
        if (scope.data.single) {
          timeline.clear({groups: true});
          timeline.setItems(scope.data.load);
        } else {
          timeline.setGroups(scope.data.load.groups);
          timeline.setItems(scope.data.load.items);
        }
        timeline.fit();
      });

      scope.$watchCollection('options', function (options) {
        timeline.clear({options: true});
        timeline.setOptions(options);
      });

      scope.$watch('events', function (events) {
        angular.forEach(events, function (callback, event) {
          if (['rangechange', 'rangechanged', 'select', 'timechange', 'timechanged'].indexOf(String(event)) >= 0) {
            timeline.on(event, callback);
          }
        });
      });

      visCtrl.setTimeline(timeline);
    }
  }
});

ngVis2.directive('timeBotones', function(){
  return {
    restrict: 'EA',
    require: '^vis2',
    link: function ($scope, element, attr, vis) {
      $scope.viewAlls = function(makeVis, categories, articles, value, historic, favorites){
        alert("Hola");
        $scope.data = constructData(makeVis, categories, articles, value, historic, favorites); 
      };
      $scope.viewHistory = function(makeVis, categories, articles, historic){
        $scope.data = constructHistoric(makeVis, categories, articles, historic);
      };
      $scope.viewFavorite = function(makeVis, categories, articles, favorites){
        $scope.data = constructFavorites(makeVis, categories, articles, favorites);
      };
    }
  }
});

ngVis2
  .directive('myDirectiva2', function () {
    return {
      require: '^vis2',
        link: function ($scope, element, attrs) {
          $scope.nuevo2 = function(){
            alert('que pasa2');
          }; 

          $scope.saltar2 = function(){
            alert('saltar2');
          };

          $scope.allData = function(makeVis, categories, articles, value, historic, favorites){
            var value = 1;
            $scope.data = constructData(makeVis, categories, articles, value, historic, favorites); 
          }
          $scope.historyData = function(makeVis, categories, articles, historic){
            $scope.data = constructHistoric(makeVis, categories, articles, historic);
          };
          $scope.favoriteData = function(makeVis, categories, articles, favorites){
            $scope.data = constructFavorites(makeVis, categories, articles, favorites);
          };
        }
    };
});

ngVis2
  .directive('myDirectiva', function () {
    return {
        link: function ($scope, element, attrs) {
          $scope.nuevo = function(){
            alert('que pasa');
          } 

          $scope.saltar = function(){
            alert('saltar');
          }

          $scope.mynew = function(){
            alert('function new');
          }

           /* element.bind('click', function () {
                element.html('You clicked me!');
                element.css('background-color', 'red');
            });
            element.bind('mouseenter', function () {
                element.css('background-color', 'yellow');
            });
            element.bind('mouseleave', function () {
                element.css('background-color', 'white');
            });*/
        }
    };
});

ngVis2
  .directive('pasto', function () {
    return {
      restrict: 'EA',
      require: '^vis2',
      scope: {
        evento: '='
        /*,
        setVis: '=',
        data1: '=',
        data2: '=',
        data3: '=' */
      },
      template:'<button ng-click="mynews()">toggle</button>',
      link: function(scope, element, attrs) {
        scope.mynews = function(){
          alert("salut mon ami !!");
        };
        scope.$watch('evento', function(visSetData) {
          if(scope.evento == 'Superhero'){
            console.log('ver que pasas '+scope.evento);
            alert('voici');
          }  
        });
      }
    };
});  

  var simplesDatos = function (visSetData) {
    return visSetData([
      { id: 77,
        content: '<i class="fi-flag"></i> simple',
        start: moment().add('days', 1),
        className: 'magenta' }
    ]);
  };

