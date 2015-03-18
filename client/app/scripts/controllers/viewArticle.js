'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('viewArticle', function ($scope, $routeParams, articleResource, categorieResource) {

  //List Categories
  $scope.categories = categorieResource.query();
  	
  //Get Articles
  $scope.article = articleResource.get( { id : $routeParams.articleId } );
  
  //Rating 
  $scope.rate = 7;
  $scope.max = 10;
  $scope.isReadonly = true;
  $scope.makeRate = function(value){
    alert($scope.rate);
  }

  //Carousel
  $scope.myInterval = 2000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/300',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }

});


