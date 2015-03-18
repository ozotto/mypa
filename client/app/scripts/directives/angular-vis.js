'use strict';

//var ngVis = angular.module('ngVis', []);

angular.module('clientApp')
.factory('visDataSet', function () {
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

angular.module('clientApp')
  .directive('vis', function () {
  return {
    restrict: 'EA',
    transclude: true,
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

angular.module('clientApp')
  .directive('timeLine', function () {
  return {
    restrict: 'EA',
    require: '^vis',
    //transclude: false,
    
    scope: {
      data: '=',
      options: '=',
      events: '='
    },
    link: function (scope, element, attr, visCtrl, $scope) {
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

angular.module('clientApp')
  .directive('timeBoard', function () {
  return {
    restrict: 'EA',
    require: '^vis',
    link: function (scope, element, attr, vis) {
      // Allow setting of the day/month formats using attributes
      var nameFormat = {
        day: "dddd",
        month: "MMMM"
      };
      nameFormat.day = attr.formatDay || "dddd";
      nameFormat.month = attr.formatMonth || "MMMM";

      var range = {
        apart: function (date) {
          return {
            year: moment(date).get('year'),
            month: {
              number: moment(date).get('month'),
              name: moment(date).format(nameFormat.month)
            },
            week: moment(date).format('w'),
            day: {
              number: moment(date).get('date'),
              name: moment(date).format(nameFormat.day)
            },
            hour: moment(date).format('HH'),
            minute: moment(date).format('mm'),
            second: moment(date).format('ss'),
            milli: moment(date).get('milliseconds')
          }
        },

        analyse: function (period) {
          var p = {
            s: this.apart(period.start),
            e: this.apart(period.end)
          };

          // TODO: Choose for a more sensible name
          var info = {
            first: '',
            second: '',
            third: ''
          };

          if (p.s.year == p.e.year) {
            info = {
              first: p.s.day.name + ' ' + p.s.day.number + '-' + p.s.month.name + '  -  ' + p.e.day.name + ' ' + p.e.day.number + '-' + p.e.month.name,
              second: p.s.year,
              third: ''
            };

            if (p.s.month.number == p.e.month.number) {
              info = {
                first: p.s.day.name + ' ' + p.s.day.number + '  -  ' + p.e.day.name + ' ' + p.e.day.number,
                second: p.s.month.name + ' ' + p.s.year,
                third: 'Month number: ' + Number(p.s.month.number + 1)
              };

              if (p.s.week == p.e.week) {
                info.third += ', Week number: ' + p.s.week;
              }
              else {
                info.third += ', Week numbers: ' + p.s.week + ' - ' + p.e.week;
              }

              if (p.s.day.number == p.e.day.number) {
                if (p.e.hour == 23 &&
                  p.e.minute == 59 &&
                  p.e.second == 59 &&
                  p.e.milli == 999) {
                  p.e.hour = 24;
                  p.e.minute = '00';
                  p.e.second = '00';
                  p.e.milli = '00';
                }

                info = {
                  first: p.s.hour + ':' + p.s.minute + '  -  ' + p.e.hour + ':' + p.e.minute,
                  second: p.s.day.name + ' ' + p.s.day.number + ' ' + p.s.month.name + ' ' + p.s.year,
                  third: 'Week number: ' + p.s.week
                };

                if (p.s.hour == p.e.hour) {
                  info = {
                    first: p.s.hour + ':' + p.s.minute + ':' + p.s.second + '  -  ' + p.e.hour + ':' + p.e.minute + ':' + p.e.second,
                    second: p.s.day.name + ' ' + p.s.day.number + ' ' + p.s.month.name + ' ' + p.s.year,
                    third: 'Week number: ' + p.s.week
                  };

                  if (p.s.minute == p.e.minute) {
                    info = {
                      first: p.s.hour + ':' + p.s.minute + ':' + p.s.second + '.' + p.s.milli + '  -  ' + p.e.hour + ':' + p.e.minute + ':' + p.e.second + '.' + p.e.milli,
                      second: p.s.day.name + ' ' + p.s.day.number + ' ' + p.s.month.name + ' ' + p.s.year,
                      third: 'Week number: ' + p.s.week
                    };
                  }
                }
              }
            }
          }
          else {
            info = {
              first: p.s.day.name + ' ' + p.s.day.number + '-' + p.s.month.name + ', ' + p.s.year + '  -  ' + p.e.day.name + ' ' + p.e.day.number + '-' + p.e.month.name + ', ' + p.e.year,
              second: '',
              third: 'Years: ' + p.s.year + ' - ' + p.e.year
            };
          }

          return info;
        },

        indicate: function (period) {
          return this.analyse(period);
        }
      };

      scope.$watch('range', function (period) {
        scope.info = range.indicate(period);
      });
    }
  }
});

//Custom Directive Menu Navegation
angular.module('clientApp')
  .directive('menuTimeLine', function () {
  return function (scope, element, attrs) {
      element.bind("click", function () {
        console.log('in directive');
        scope.testFromDirective();
      });
    }
  
}); 

angular.module('clientApp')
  .directive('timeButtons', function(){
  return {
    restrict: 'EA',
    require: '^vis',

    link: function ($scope, element, attr, vis) {
      
      $scope.testBoton = function(){
        console.log("in boton");
        $scope.valuetestBoton = true;
      }

      $scope.sortTimeLine = function(makeVis, categories, articles, value, historic, favorites){
        $scope.data = constructData(makeVis, categories, articles, value, historic, favorites); 
        //$scope.myTestVariable = "0";
      };
/*
      $scope.viewAlls = function(makeVis, categories, articles, value, historic, favorites){
        $scope.data = constructData(makeVis, categories, articles, value, historic, favorites); 
      }

      $scope.sortUp = function(makeVis, categories, articles, value, historic, favorites){
        $scope.data = constructData(makeVis, categories, articles, value, historic, favorites);
      };

      $scope.sortDown = function(makeVis, categories, articles, value, historic, favorites){
        $scope.data = constructData(makeVis, categories, articles, value, historic, favorites);
      };

      $scope.sortPlus = function(makeVis, categories, articles, value, historic, favorites){
        $scope.data = constructData(makeVis, categories, articles, value, historic, favorites);
      };
*/
      $scope.viewHistory = function(makeVis, categories, articles, historic){
        $scope.data = constructHistoric(makeVis, categories, articles, historic);
      };
      $scope.viewFavorite = function(makeVis, categories, articles, favorites){
        $scope.data = constructFavorites(makeVis, categories, articles, favorites);
      };


    }
  }
});

angular.module('clientApp')
  .directive('timeNavigation', function () {
  return {
    restrict: 'EA',
    require: '^vis',
    link: function (scope, element, attr, vis) {
      setTimeout(function () {
        var start = 0;

        scope.setScope = function (period) {
          scope.view = {
            day: false,
            week: false,
            month: false,
            year: false,
            lastday: false,
            lastweek: false,
            lastmonth: false,
            lastyear: false,
            
            cal: false, //custom my

            custom: false
          };

          // Sanity check
          if(scope.view[period] === undefined) {
            period = 'custom';
          }
          scope.view[period] = true;

          if (period == 'custom') {
            vis.timeline.setOptions({
              min: null,
              max: null
            });

            vis.timeline.fit();
          }
          else {
            var periodStart, periodEnd;
            if(period.indexOf('last') === 0) {
              // These options are seen as the last day, or last week
              // Starting from NOW.
              period = period.substr(4);

              periodStart = moment().subtract(1, period);
              periodEnd = moment().valueOf();
            }
            else {
              // These options are 'this week', or 'this month' etc
              // Starting from the beginning of the week/month etc.
              if(period == 'cal'){
                var m = moment([2014, 10, 2]);
                periodStart = m.startOf('day').valueOf();
                periodEnd = m.endOf('day').valueOf();  
              }else{
                periodStart = moment().startOf(period).valueOf();
                periodEnd = moment().endOf(period).valueOf();  
              }
              
            }

            vis.timeline.setWindow(periodStart, periodEnd);
            vis.timeline.setOptions({
              min: periodStart,
              start: periodStart,
              max: periodEnd,
              end: periodEnd
            });
          }

          start = 0;
        };
        
        scope.setScope('custom');
        //scope.setScope('month');
        

        var view;

        scope.stepScope = function (direction) {
          if ((scope.view && scope.view.custom) || !angular.isDefined(scope.view)) {
            var percentage = (direction > 0) ? 0.2 : -0.2,
              range = scope.timeline.getWindow(),
              interval = range.end - range.start;

            scope.timeline.setWindow({
              start: range.start.valueOf() - interval * percentage,
              end: range.end.valueOf() - interval * percentage
            });
          } else {
            start = start + direction;

            angular.forEach(scope.view, function (active, _view) {
              if (active) view = _view;
            });

            vis.timeline.setWindow(
              moment().add(view, start).startOf(view),
              moment().add(view, start).endOf(view)
            );

            vis.timeline.setOptions({
              min: moment().add(view, start).startOf(view).valueOf(),
              start: moment().add(view, start).startOf(view).valueOf(),
              max: moment().add(view, start).endOf(view).valueOf(),
              end: moment().add(view, start).endOf(view).valueOf()
            });
          }
        };

        scope.zoomScope = function (percentage) {
          var range = scope.timeline.getWindow(),
            interval = range.end - range.start;

          scope.timeline.setWindow({
            start: range.start.valueOf() - interval * percentage,
            end: range.end.valueOf() + interval * percentage
          });
        }
      }, 0);
    }
  }
});

/**
 * Directive for network chart.
 */
angular.module('clientApp')
  .directive('network', function () {
  return {
    restrict: 'EA',
    require: '^vis',
    transclude: false,
    scope: {
      data: '=',
      options: '=',
      events: '='
    },
    link: function (scope, element, attr, visCtrl) {
      var network = new vis.Network(element[0], scope.data, scope.options);

      scope.$watch('data', function () {
        network.setData(scope.data);
      });

      scope.$watchCollection('options', function (options) {
        network.setOptions(options);
      });

      scope.$watch('events', function (events) {
        angular.forEach(events, function (callback, event) {
          if (['select', 'click', 'hoverNode'].indexOf(String(event)) >= 0) {
            network.on(event, callback);
          }
        });
      });
    }
  };
});

/**
 * Directive for graph2d.
 * Uses the 'setTimeline' method in vis directive to allow support for timeboard and navigation
 */
angular.module('clientApp')
  .directive('graph2d', function () {
  return {
    restrict: 'EA',
    require: '^vis',
    transclude: false,
    scope: {
      data: '=',
      options: '=',
      events: '='
    },
    link: function (scope, element, attr, visCtrl) {
      var graph = new vis.Graph2d(element[0]);

      // Record if we have a chart loaded. Allows ng-hide="graphLoaded" to be used
      scope.graphLoaded = false;

      scope.$watch('data', function () {
        if (scope.data === undefined) {
          return;
        }

        // There are currently some bugs in the vis library
        // Changing data sets causes the lib to hang, so we recreate the graph (for now)
        if(graph !== undefined) {
          graph.destroy();
        }
        graph = new vis.Graph2d(element[0]);
        visCtrl.setTimeline(graph);

        graph.clear({items: true, groups: true, options: true});

        scope.graphLoaded = true;

        if (scope.data.single) {
          graph.clear({groups: true});
          graph.setItems(scope.data);
        } else {
          graph.setOptions(scope.options);
          graph.setGroups(scope.data.groups);
          graph.setItems(scope.data.items);
        }
      });

      scope.$watchCollection('options', function (options) {
        graph.clear({options: true});
        graph.setOptions(options);
      });

      scope.$watch('events', function (events) {
        angular.forEach(events, function (callback, event) {
          if (['rangechange', 'rangechanged', 'select', 'timechange', 'timechanged'].indexOf(String(event)) >=
              0) {
            graph.on(event, callback);
          }
        });
      });

      visCtrl.setTimeline(graph);
    }
  };
});