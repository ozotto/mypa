'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('mynewhome', function ($scope, categorieResource, articleResource, favoriteResource, historicResource, $timeout, visSetData) {

  $scope.logs = {};
  $scope.data = sampleData(visSetData);
  $scope.makeVis = visSetData;

  $scope.myTestVariable = "";

  $scope.variable = false;
  $scope.variable2 = true;

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

  //Consult all articles
  articleResource.query().$promise.then(
    function(data){
      $scope.articles = data;
  });

  //List Articles
  $scope.$watch('articles',
    function(newValue, oldValue){
      if (angular.isUndefined(newValue) || newValue == null) return;
      
      $scope.data = genereGroups($scope.categories, $scope.articles);
      $timeout(function () { $scope.timeline.fit() });
    
  });

  var genereGroups = function(categoriesData, articlesData){
    var newCategories = [];
    var newCategoriesTemp = [];
    var newArticles = [];
    
    for(var i in articlesData){
      var item = articlesData[i];
          
      var id = item._id;
      if (id != undefined){
        var group = item.category;
        var content = item.title;
        //var content = "<a onclick='myFunction()'>"+item.title+"</a>";
        var start = item.created;

        for(var x in categoriesData){
          var itemCat = categoriesData[x];
              
          var idCat = itemCat._id;
          var nameCategory = itemCat.name;
          //var name = itemCat.name
          //var name = "<a ng-click='mynew()'>"+itemCat.name+"</a>";//"<pasto>"+itemCat.name+"</pasto>";/
          var name = "<a onclick=changeCategory('"+nameCategory+"')>"+itemCat.name+"</a>";
          //var name = "<a ng-click='espero()' class='button tiny'>"+Espero+x+"</a>";

              
          if(idCat == group) 
            newCategoriesTemp.push({ id : idCat, content : name, value:x }); 
        }
        
        newArticles.push({ id: id, group: group, content: content, start: start }); 
      }  
    } 

    var myId, myGroup, myContent, myStart;
    myId = 11111;
    myGroup = group;
    myContent = "ViewMore";
    myStart = start;
    newArticles.push({ id: myId, group: myGroup, content: myContent, start: myStart }); 
      
    newCategoriesTemp.sort(sortUp); 
    newCategories = deleteDuplicates(newCategoriesTemp);
    return visSetData({ groups :newCategories , items :newArticles});
  };  

  $scope.$watch(function() {
    return $scope.myTestVariable;
  },  function(newValue, oldValue) {
      console.log("change detected: " + newValue)
      if(newValue == 'Culture'){
        alert("hELLO");
        var idCat = '54573d5d2e821c8302000009';
        $scope.data = constructDataCategory(visSetData, $scope.categories, $scope.articles, idCat);
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
                  $scope.variable = true;
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

});