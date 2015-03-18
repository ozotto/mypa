'use strict';

angular.module('clientApp').directive('lineTime', [function() {
    return {
      restrict: 'AE',
      scope: {
        data: '=data',
        item: '=item',
        options: '=options',
        event: '@event',
        callback: '&'
    },
    link: function(scope, element, attrs) {        
 	  var container = element[0], buildGraph = function(scope) {
        var graph = null;
        //graph = new vis.Network(container, scope.data, scope.options);
        //graph = new vis.Timeline(container, scope.data, scope.options);
        graph = new vis.Timeline(container);
        graph.setGroups(scope.data);
        graph.setItems(scope.options);
          return graph.on(scope.event, function(properties) {
            if (properties.nodes.length !== 0) { 
              scope.callback({params: properties});
            } 
        });
      };      
      scope.$watch('data', function(newval, oldval) {
        buildGraph(scope);
      }, true);        
    }
  };
}]);