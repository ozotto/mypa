'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $modal, $log, $location, $timeout, visDataSet, categorieResource, articleResource, favoriteResource, historicResource) {
  
  /*---------- Config TimeLine configTimeline.js ---------------*/
  $scope.logs = {};
  $scope.defaults = defaultsTimeline();
  var options = optionsTimeline();
  
  $scope.data = sampleData(visDataSet);
  $scope.dataTime = sampleData(visDataSet);
  $scope.dataHistoric = sampleData(visDataSet);
  $scope.dataFavorites = sampleData(visDataSet);
  $scope.myTestVariable = "0";

  $scope.makeVis = visDataSet;
  $scope.valueAlls      = 1;
  $scope.valueSortUp    = 2;
  $scope.valueSortDown  = 3;
  $scope.valueSortPlus  = 4;  
  
  
  $scope.showTimeline = "sortby";
  
  //SelectOption to Sort by Timeline
  $scope.optionCategories = valueSelectOption();
  $scope.opCategoryDefault = $scope.optionCategories[1];
  
  $scope.selectSort = function (){
    var valueSelected = $scope.opCategoryDefault.value;
    $scope.showTimeline = "sortby";  
    $timeout(function () { $scope.timeline.clear({options: true}) });
    $scope.data = constructData(visDataSet, $scope.categories, $scope.articles, valueSelected, $scope.historic, $scope.favorites); 
    $timeout(function () { $scope.timeline.fit() });
  };

  $scope.selectCategory = function(){
    var categorySelected = $scope.opSelectCategory;
    var idCat = $scope.opSelectCategory._id;
    $scope.dataTime = constructDataCategory(visDataSet, $scope.categories, $scope.articles, idCat);
    if($scope.dataTime != 0){
      $scope.nameCategory = $scope.opSelectCategory.name;  
      $scope.showTimeline = "bycategory";
    }else{
      $scope.dataTime = sampleData(visDataSet);
      $scope.showTimeline = "notArticle";
      $scope.msgTime = "Not Articles yet"
    } 
  };

  $scope.viewHistoric = function(){
    $scope.dataHistoric = constructHistoric(visDataSet, $scope.categories, $scope.articles, $scope.historic);
    if($scope.dataHistoric != 0){
      $scope.showTimeline = "viewHistoric";
    }else{
      $scope.dataHistoric = sampleData(visDataSet);
      $scope.showTimeline = "notArticle";
      $scope.msgTime = "Not Historic yet"
    } 
  };

  $scope.viewFavorites = function(){
    $scope.dataFavorites = constructFavorites(visDataSet, $scope.categories, $scope.articles, $scope.favorites);
    if($scope.dataFavorites != 0){
      $scope.showTimeline = "viewFavorites";
    }else{
      $scope.dataFavorites = sampleData(visDataSet);
      $scope.showTimeline = "notArticle";
      $scope.msgTime = "Not Historic yet"
    } 
  };

  //Consult all categories
  categorieResource.query().$promise.then(
    function(categoriesData){
      $scope.categories  = categoriesData;
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

  //Verify articles
  $scope.$watch('articles',
    function(newValue, oldValue){
      if (angular.isUndefined(newValue) || newValue == null) return;
        $scope.data = constructData(visDataSet, $scope.categories, $scope.articles, $scope.opCategoryDefault.value, $scope.historic, $scope.favorites);   

        $scope.options = angular.extend(options, {});

        $timeout(function () { $scope.timeline.fit() });
  });

  $scope.$watch('myTestVariable',
    function(newValue, oldValue){
      if(newValue != '0'){
        $timeout(function () { $scope.timeline.clear({options: true}) });
        $scope.data = constructDataCategory(visDataSet, $scope.categories, $scope.articles, newValue);
        $timeout(function () { $scope.timeline.fit() });
      }  
  });

  $scope.loadMoreTweets = function () {
      //alert("Loading tweets in control!");
      //console.log('in control here probleme?');
      $scope.myTestVariable = "hello";
      //$scope.data = sampleData(visDataSet);
      $scope.data = constructData(visDataSet, $scope.categories, $scope.articles, $scope.valueSortPlus, $scope.historic, $scope.favorites); 
      $timeout(function () { $scope.timeline.fit() });
      //$scope.$apply();
  };

  //Function Events TimeLine
  $timeout(function () {
    $scope.events = {
      select: function(properties){
        $timeout(function () {
          $scope.logs.select = properties;
          var SelectedArticle = properties

              for(var i in SelectedArticle){
                 var item = SelectedArticle[i];
                 if(item.length>0){
                  $scope.articleSelected = articleResource.get( { id : item } );
                  openModalItem(item);
                 } 
              }
        });
      }
    };
    $scope.data.load.on('*', function(event, properties){
      $timeout(function(){
        $scope.logs.items = {
          event:event,
          properties: properties
        };
      });
    });
  });

  //Function Open Modal Info Articles
  var openModalItem = function(item){
    
    var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'modalControl',
        size: 'lg',
        resolve: {
          items: function () {
            return item;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
  };

  //Info Panel
  $scope.dateDay = moment().format('dddd Do MMMM YYYY');


  //-------------------------------------------------------------------------------------------
  /*--- Button Change Data ----*/
  $scope.allData = function(){
    var valueSelected = 1;
    $scope.data = generateData(visDataSet, $scope.categories, $scope.articles, valueSelected, $scope.historic, $scope.favorites); 
    console.log($scope.data);
  };

  $scope.orderUpData = function(){
    var valueSelected = 2;
    $scope.data = generateData(visDataSet, $scope.categories, $scope.articles, valueSelected, $scope.historic, $scope.favorites); 
    console.log($scope.data);
  };

  $scope.orderDownData = function(){
    
    var orderedSorting = function (a, b) {
          return b.value - a.value;
    };
    $scope.options = angular.extend(options, {
          groupOrder: orderedSorting
    });
   /* var valueSelected = 3;
    $scope.data = generateData(visDataSet, $scope.categories, $scope.articles, valueSelected, $scope.historic, $scope.favorites); 
    console.log($scope.data);
    */
  };

  $scope.maxData = function(){
    var valueSelected = 4;
    $scope.data = generateData(visDataSet, $scope.categories, $scope.articles, valueSelected, $scope.historic, $scope.favorites); 
    console.log($scope.data);
  };

  $scope.historyData = function(){

  };

  $scope.favoriteData = function(){

  };

  $scope.checkOff = function(){
    //Change Icon
    var valueCheck = 0;
    $scope.data = changeVisual(visDataSet, $scope.categories, $scope.articles, valueCheck, $scope.historic, $scope.favorites); 
  };

});




