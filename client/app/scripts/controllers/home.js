'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('homeCtrl', function ($scope, $modal, $log, $location, $timeout, visDataSet, categorieResource, articleResource, favoriteResource, historicResource) {
  
  //Data Info Default 
  $scope.logs = {};
  var options = optionsTimeline();
  $scope.data = sampleData(visDataSet);
  
  $scope.dateDay = moment().format('dddd Do MMMM YYYY');
  $scope.myTestVariable = "0";

  //Checkbox
  $scope.checkRadio = "Point";

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

   $scope.opCategoryDefault = 2;
   //Verify articles
   $scope.$watch('articles',
    function(newValue, oldValue){
      if (angular.isUndefined(newValue) || newValue == null) return;
        
        if($scope.checkRadio == "Data")
          $scope.data = dataAllSortTime(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);     
        
        if($scope.checkRadio == "Point")
          $scope.data = dataAllSortTimePoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);

        var orderedSorting = function (a, b) {
              return b.value - a.value;
        };
        $scope.options = angular.extend(options, {
              groupOrder: orderedSorting
        });

        $timeout(function () { $scope.timeline.fit() });

        $scope.stateData = 1;

   });

  //Verify change category
  $scope.$watch('myTestVariable',
    function(newValue, oldValue){
      if(newValue != '0'){
        $timeout(function () { $scope.timeline.clear({options: true}) });
        
        $scope.idCategorySelected = newValue;
        $scope.stateData = 8;

        if($scope.checkRadio == "Data")
          $scope.data = dataOnlyCategory(visDataSet, $scope.categories, $scope.articles, $scope.idCategorySelected);
        
        if($scope.checkRadio == "Point")
          $scope.data = dataOnlyCategoryPoint(visDataSet, $scope.categories, $scope.articles, $scope.idCategorySelected);

        $timeout(function () { $scope.timeline.fit() });
      }  
  });

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

  //Functions change data
  $scope.allData = function(){

    if($scope.checkRadio == "Data")
      $scope.data = dataAllTime(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites); 
        
    if($scope.checkRadio == "Point")
      $scope.data = dataAllTimePoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites); 
    
    var orderedSorting = function (a, b) {
              return a.value - b.value;
    };
    $scope.options = angular.extend(options, {
      groupOrder: orderedSorting
    });

    $timeout(function () { $scope.timeline.fit() });

    $scope.stateData = 2;

  };

  $scope.historyData = function(){

    if($scope.checkRadio == "Data")
      $scope.data = dataAllHistory(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);
        
    if($scope.checkRadio == "Point")
      $scope.data = dataAllHistoryPoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);
    
    var orderedSorting = function (a, b) {
      return b.value - a.value;
    };
    $scope.options = angular.extend(options, {
      groupOrder: orderedSorting
    });

    $timeout(function () { $scope.timeline.fit() });

    $scope.stateData = 3;

  };

  $scope.favoriteData = function(){
    
    if($scope.checkRadio == "Data")
      $scope.data = dataAllFavorites(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);
        
    if($scope.checkRadio == "Point")
      $scope.data = dataAllFavoritesPoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);

    
    var orderedSorting = function (a, b) {
      return b.value - a.value;
    };
    $scope.options = angular.extend(options, {
      groupOrder: orderedSorting
    });

    $timeout(function () { $scope.timeline.fit() });

    $scope.stateData = 4;    

  };

  $scope.orderUpData = function(){

    if($scope.checkRadio == "Data")
      $scope.data = dataAllSortTime(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);   
        
    if($scope.checkRadio == "Point")
      $scope.data = dataAllSortTimePoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);   
    

    var orderedSorting = function (a, b) {
              return b.value - a.value;
    };
    $scope.options = angular.extend(options, {
      groupOrder: orderedSorting
    });

    $timeout(function () { $scope.timeline.fit() });

    $scope.stateData = 5;

  };

  $scope.orderDownData = function(){
    
    if($scope.checkRadio == "Data")
      $scope.data = dataAllSortTime(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);   
        
    if($scope.checkRadio == "Point")
      $scope.data = dataAllSortTimePoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);

    var orderedSorting = function (a, b) {
              return a.value - b.value;
    };
    $scope.options = angular.extend(options, {
      groupOrder: orderedSorting
    });

    $timeout(function () { $scope.timeline.fit() });

    $scope.stateData = 6;

  };

  $scope.orderMoreData = function(){
    
    if($scope.checkRadio == "Data")
      $scope.data = dataMoreTime(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);  
        
    if($scope.checkRadio == "Point")
      $scope.data = dataMoreTimePoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);  

    $scope.stateData = 7;

  };


  $scope.checkOn = function() {
    $scope.checkRadio = "Data";
    if($scope.stateData == 1){
      $scope.data = dataAllSortTime(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);   

        var orderedSorting = function (a, b) {
              return b.value - a.value;
        };
        $scope.options = angular.extend(options, {
              groupOrder: orderedSorting
        });

        $timeout(function () { $scope.timeline.fit() });
    }
    if($scope.stateData == 2){
      $scope.data = dataAllTime(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites); 
      var orderedSorting = function (a, b) {
                return a.value - b.value;
      };
      $scope.options = angular.extend(options, {
        groupOrder: orderedSorting
      });

      $timeout(function () { $scope.timeline.fit() });
    }
    if($scope.stateData == 3){
      $scope.data = dataAllHistory(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);
      var orderedSorting = function (a, b) {
        return b.value - a.value;
      };
      $scope.options = angular.extend(options, {
        groupOrder: orderedSorting
      });

      $timeout(function () { $scope.timeline.fit() });
    }
    if($scope.stateData == 4){
      $scope.data = dataAllFavorites(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);
      var orderedSorting = function (a, b) {
        return b.value - a.value;
      };
      $scope.options = angular.extend(options, {
        groupOrder: orderedSorting
      });

      $timeout(function () { $scope.timeline.fit() });
    }
    if($scope.stateData == 5){
      $scope.data = dataAllSortTime(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);   

      var orderedSorting = function (a, b) {
                return b.value - a.value;
      };
      $scope.options = angular.extend(options, {
        groupOrder: orderedSorting
      });

      $timeout(function () { $scope.timeline.fit() });
    }
    if($scope.stateData == 6){
      $scope.data = dataAllSortTime(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);   

      var orderedSorting = function (a, b) {
                return a.value - b.value;
      };
      $scope.options = angular.extend(options, {
        groupOrder: orderedSorting
      });

      $timeout(function () { $scope.timeline.fit() });
    }
    if($scope.stateData == 7){
      $scope.data = dataMoreTime(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);
    }
    if($scope.stateData == 8){
      $scope.data = dataOnlyCategory(visDataSet, $scope.categories, $scope.articles, $scope.idCategorySelected);
    }
  }

  $scope.checkOff = function() {
    $scope.checkRadio = "Point";
    if($scope.stateData == 1){
      $scope.data = dataAllSortTimePoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);   

        var orderedSorting = function (a, b) {
              return b.value - a.value;
        };
        $scope.options = angular.extend(options, {
              groupOrder: orderedSorting
        });

        $timeout(function () { $scope.timeline.fit() });
    }
    if($scope.stateData == 2){
      $scope.data = dataAllTimePoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites); 
      var orderedSorting = function (a, b) {
                return a.value - b.value;
      };
      $scope.options = angular.extend(options, {
        groupOrder: orderedSorting
      });

      $timeout(function () { $scope.timeline.fit() });
    }
    if($scope.stateData == 3){
      $scope.data = dataAllHistoryPoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);
      var orderedSorting = function (a, b) {
        return b.value - a.value;
      };
      $scope.options = angular.extend(options, {
        groupOrder: orderedSorting
      });

      $timeout(function () { $scope.timeline.fit() });
    }
    if($scope.stateData == 4){
      $scope.data = dataAllFavoritesPoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);
      var orderedSorting = function (a, b) {
        return b.value - a.value;
      };
      $scope.options = angular.extend(options, {
        groupOrder: orderedSorting
      });

      $timeout(function () { $scope.timeline.fit() });
    }
    if($scope.stateData == 5){
      $scope.data = dataAllSortTimePoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);   

      var orderedSorting = function (a, b) {
                return b.value - a.value;
      };
      $scope.options = angular.extend(options, {
        groupOrder: orderedSorting
      });

      $timeout(function () { $scope.timeline.fit() });
    }
    if($scope.stateData == 6){
      $scope.data = dataAllSortTimePoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);   

      var orderedSorting = function (a, b) {
                return a.value - b.value;
      };
      $scope.options = angular.extend(options, {
        groupOrder: orderedSorting
      });

      $timeout(function () { $scope.timeline.fit() });
    }
    if($scope.stateData == 7){
      $scope.data = dataMoreTimePoint(visDataSet, $scope.categories, $scope.articles, $scope.historic, $scope.favorites);
    }
    if($scope.stateData == 8){
      $scope.data = dataOnlyCategoryPoint(visDataSet, $scope.categories, $scope.articles, $scope.idCategorySelected);
    }
  }

  //Calender
   $scope.today = function() {
    
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };


  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];


  $scope.dt = new Date();
  $scope.isSelectCalendar = false;
  $scope.openCalendar = function(){
      $scope.isSelectCalendar = true;
      console.log($scope.dt);
  }

  $scope.$watch('dt',
    function(newValue, oldValue){
           $scope.isSelectCalendar = false;
  });





});
