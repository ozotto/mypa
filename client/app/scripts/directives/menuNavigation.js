'use strict';

angular.module('clientApp')
  .directive("navigationmenu", function () {
  return {
  	//restrict: 'EA',
  	//require: '^vis',
  	link: function (scope, element, attrs) {
    
	    element.bind("click", function () {
	      scope.loadMoreTweets();
	    });
  	}
  }
   
});