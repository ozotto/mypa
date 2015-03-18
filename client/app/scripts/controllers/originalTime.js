'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('originalTime', function ($scope, $location, $timeout, visDataSet, categorieResource, articleResource) {

  /*---------- Construction TimeLine ---------------*/
  //Array events TimeLine
  $scope.defaults = {
    orientation: ['top', 'bottom'],
    autoResize: [true, false],
    showCurrentTime: [true, false],
    showCustomTime: [true, false],
    showMajorLabels: [true, false],
    showMinorLabels: [true, false],
    align: ['left', 'center', 'right'],
    stack: [true, false],

    moveable: [true, false],
    zoomable: [true, false],
    selectable: [true, false],
    editable: [true, false]
  };

  var options = {
    align: 'center', 
    autoResize: true, 
    //editable: true,
    selectable: true,
    orientation: 'bottom',
    showCurrentTime: true,
    showCustomTime: true,
    showMajorLabels: true,
    showMinorLabels: true
  };

  var now = moment().minutes(0).seconds(0).milliseconds(0);
  $timeout(function () { $scope.timeline.clear({options: true}) });
  /*$scope.data = visDataSet({
          groups: [
            {id: 0, content: 'First', value: 1},
            {id: 1, content: 'Third', value: 3},
            {id: 2, content: 'Second', value: 2}
          ],
          items: [
            {id: 0, group: 0, content: 'item 0', start: new Date(2014, 3, 17)},
            {id: 1, group: 0, content: 'item 1', start: new Date(2014, 3, 19)},
            {id: 2, group: 1, content: 'item 2', start: new Date(2014, 3, 16)},
            {id: 3, group: 1, content: 'item 3', start: new Date(2014, 3, 23)},
            {id: 4, group: 1, content: 'item 4', start: new Date(2014, 3, 22)},
            {id: 5, group: 2, content: 'item 5', start: new Date(2014, 3, 24)}
          ]
        });*/
    //$scope.groupCountValue = $scope.groupCountValue || 100;

        $scope.groupCount = function (count) {
          
          var data = {
            groups: [
              {id: 1, content: 'Truck&nbsp;1'},
              {id: 2, content: 'Truck&nbsp;2'},
              {id: 3, content: 'Truck&nbsp;3'},
              {id: 4, content: 'Truck&nbsp;4'}
            ],
            items: []
          };

          var order = 1;
          var truck = 1;

          for (var j = 0; j < 4; j++) {
            var date = new Date();

            for (var i = 0; i < count / 4; i++) {
              date.setHours(date.getHours() + 4 * (Math.random() < 0.2));
              var start = new Date(date);
              date.setHours(date.getHours() + 2 + Math.floor(Math.random() * 4));
              var end = new Date(date);

              data.items.push({
                id: order,
                group: truck,
                start: start,
                end: end,
                content: 'Order ' + order
              });

              order++;
            }

            truck++;
          }

          $scope.data = visDataSet(data);
        };

        $scope.groupCount(30);
/*
        var orderedContent = 'content';
        var orderedSorting = function (a, b) {
          return a.value - b.value;
        };

        $scope.options = angular.extend(options, {
          groupOrder: orderedContent
          editable: true
        });*/
  $timeout(function () { $scope.timeline.fit() });      

  
  });
