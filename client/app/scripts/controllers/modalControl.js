'use strict';
angular.module('clientApp').controller('modalControl', function ($scope, $modalInstance, items, articleResource, categorieResource, historicResource, favoriteResource) {

  //List Categories
  $scope.categories = categorieResource.query();

  //Info Article selected
  $scope.articleInfo = articleResource.get( { id : items } );

  $scope.addFavorites = function(id){
    
    var item, idArt, idFav;
    var isInsert = 0;

    favoriteResource.query().$promise.then(
    function(data){
      $scope.favoriteConsult = data;
    });

    $scope.$watch('favoriteConsult',
    function(newFavoriteConsult, oldFavoriteConsult){
      if (angular.isUndefined(newFavoriteConsult) || newFavoriteConsult == null) return;
      for(i in $scope.favoriteConsult){
        
        item = $scope.favoriteConsult[i]; 
        idFav = item.idArticle;
        if(idFav == id ){
          isInsert = 1;
        }
      } 

      if(isInsert == 0){
        favoriteResource.post( { idArticle: id } );
        console.log("Favorites Insert "+id)
      } 

    });

  }

  $scope.more = function (id){
    $modalInstance.close();
    //Save History
    
    var item, idArt, idHis;
    var isInsert = 0;
    historicResource.query().$promise.then(
    function(data){
      $scope.historicConsult = data;
    });

    $scope.$watch('historicConsult',
    function(newHistoricConsult, oldHistoricConsult){
      if (angular.isUndefined(newHistoricConsult) || newHistoricConsult == null) return;
      for(i in $scope.historicConsult){
        
        item = $scope.historicConsult[i]; 
        idHis = item.idArticle;
        if(idHis == id ){
          isInsert = 1;
        }
      } 

      if(isInsert == 0){
        historicResource.post( { idArticle: id } );
        console.log("Historic Insert "+id)
      } 

    });

    window.location = '#/articles/'+ id; 
  }

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

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