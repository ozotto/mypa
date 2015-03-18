'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('testCtrl', function ($scope, $http, $timeout, categorieResource, articleResource, favoriteResource, historicResource) {
  
  $scope.date = "";

  //Consult all categories
  categorieResource.query().$promise.then(
    function(categoriesData){
      $scope.categories  = categoriesData;
  });

  //Consult all articles
  articleResource.query().$promise.then(
    function(data){
      $scope.articles = data;
  });

  //Consult all historic
  historicResource.query().$promise.then(
    function(historicData){
      $scope.historic  = historicData;
  });

  //Consult all favorites
  favoriteResource.query().$promise.then(
    function(favoritesData){
      $scope.favorites  = favoritesData;
  });

  var numberArticles, numberCategories;
  var item, idCat, idArt, idFav, idHis, i, random, randomDate, randomMonth;

  $scope.createTest = function(numberCategories, numberArticles, numberMonth){
    
    $scope.nameCategory = "Category No. ";  

    for (i=1; i<=numberCategories; i++){
      categorieResource.post( { name: $scope.nameCategory + i } ); 
      //console.log(registre); 
    }
    
    categorieResource.query().$promise.then(
    function(categoriesData){
      $scope.categoriesInsert  = categoriesData;
    });

    $scope.$watch('categoriesInsert',
    function(newCategorieInsert, oldCategorieInsert){
      if (angular.isUndefined(newCategorieInsert) || newCategorieInsert == null) return;
      
      for (i=1; i<=numberArticles; i++){
        random = Math.floor((Math.random() * 2) + 0);
        item = $scope.categoriesInsert[random]; 
        idCat = item._id;

        randomDate = Math.floor((Math.random() * 30) + 1);
        if(numberMonth > 1 ){
          randomMonth = Math.floor((Math.random() * 11) + 0);
        }else{
          randomMonth = 11;
        }

        $scope.date = moment().year(2014).month(randomMonth).date(randomDate);;
        //$scope.date = moment().date(randomDate);

        $scope.articleTitle = "Article No. "+i; 
        $scope.articleContent = "Content Text No."+i;

        articleResource.post( { title: $scope.articleTitle,
                                content: $scope.articleContent,
                                category: idCat,
                                created: $scope.date
        });

      }
       
    });


  };

  $scope.createMonth = function(numberCategories, numberArticles, numberMonth){
    $scope.nameCategory = "Category No. "; 
    for (i=1; i<=numberCategories; i++){
      categorieResource.post( { name: $scope.nameCategory + i } ); 
    }

    categorieResource.query().$promise.then(
    function(categoriesData){
      $scope.categoriesInsert  = categoriesData;
    });

    $scope.$watch('categoriesInsert',
    function(newCategorieInsert, oldCategorieInsert){
      if (angular.isUndefined(newCategorieInsert) || newCategorieInsert == null) return;

      for (i=1; i<=numberArticles; i++){
        random = Math.floor((Math.random() * 2) + 0);
        item = $scope.categoriesInsert[random]; 
        idCat = item._id;

        randomDate = Math.floor((Math.random() * 27) + 1);
      
        $scope.date = moment().year(2015).month(0).date(randomDate);;
      
        $scope.articleTitle = "Article No. "+i; 
        $scope.articleContent = "Content Text No."+i;

        articleResource.post( { title: $scope.articleTitle,
                                content: $scope.articleContent,
                                category: idCat,
                                created: $scope.date
        });

      }

    });
  };  

  $scope.createHistoric = function(){
    
    articleResource.query().$promise.then(
    function(dataArticles){
      $scope.articlesInsert = dataArticles;
    });

    $scope.$watch('articlesInsert',
    function(newArticlesInsert, oldArticlesInsert){
      if (angular.isUndefined(newArticlesInsert) || newArticlesInsert == null) return;
      for(i in $scope.articlesInsert){
        item = $scope.articlesInsert[i]; 
        idArt = item._id;
        historicResource.post( { idArticle: idArt } );
      }  

    });

  };     
  
  $scope.createFavorites = function(){
    
    articleResource.query().$promise.then(
    function(dataArticles){
      $scope.articlesInsert = dataArticles;
    });

    $scope.$watch('articlesInsert',
    function(newArticlesInsert, oldArticlesInsert){
      if (angular.isUndefined(newArticlesInsert) || newArticlesInsert == null) return;
      for(i in $scope.articlesInsert){
        item = $scope.articlesInsert[i]; 
        idArt = item._id;
        favoriteResource.post( { idArticle: idArt } );
      }  

    });

  };     

  


  $scope.deleteAll = function(){
    //console.log("delete");
    
    //var item, idCat, idArt, i;

    $scope.$watch('categories',
    function(newValue, oldValue){
      if (angular.isUndefined(newValue) || newValue == null) return;
      for(i in $scope.categories){
        item = $scope.categories[i]; 
        idCat = item._id;
        if(idCat != undefined){
          categorieResource.delete( { id : idCat } );
          //console.log("Category deleted with id "+idCat);
        }  
      }  
    });

    $scope.$watch('articles',
    function(newArticle, oldArticle){
      if (angular.isUndefined(newArticle) || newArticle == null) return;
      for(i in $scope.articles){
        item = $scope.articles[i]; 
        idArt = item._id;
        if(idArt != undefined){
          articleResource.delete( { id : idArt } );
          //console.log("Article deleted with id "+idArt);
        }  
      }  
    });

    $scope.$watch('historic',
    function(newHistoric, oldHistoric){
      if (angular.isUndefined(newHistoric) || newHistoric == null) return;
      for(i in $scope.historic){
        item = $scope.historic[i]; 
        idHis = item._id;
        if(idHis != undefined){
          historicResource.delete( { id : idHis } );
        }  
      }  
    });

    $scope.$watch('favorites',
    function(newFavorite, oldFavorite){
      if (angular.isUndefined(newFavorite) || newFavorite == null) return;
      for(i in $scope.favorites){
        item = $scope.favorites[i]; 
        idFav = item._id;
        if(idFav != undefined){
          favoriteResource.delete( { id : idFav } );
        }  
      }  
    });

  };

}); 