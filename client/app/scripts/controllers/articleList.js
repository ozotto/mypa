'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('articleList', function ($scope, articleResource, categorieResource) {

  //Consult Categories
  categorieResource.query().$promise.then(
    function(categoriesData){
      $scope.categories  = categoriesData;
  });

  //Verify categories
  $scope.$watch('categories',
    function(newValue, oldValue){
      if (angular.isUndefined(newValue) || newValue == null) return;
      
      //Consult all articles
      articleResource.query().$promise.then(
        function(data){
          $scope.articles = data;
      });
  });

  //List Articles by Categories
  $scope.viewList = function(category){
    if(category == "alls"){
      $scope.articles = articleResource.query(); 
    }else{
      $scope.articles = categorieResource.getArticles( { id : category._id } );
    }
  };

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

  //Text Demo
  $scope.textDemo = "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.";
  $scope.maxText = 100;

  });


