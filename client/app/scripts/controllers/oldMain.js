'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('oldmain', function ($scope, $location, $timeout, visDataSet, categorieResource, articleResource) {

  /*---------- Construction TimeLine ---------------*/

  //Array events TimeLine
  $scope.logs = {};

  //Config Defaults TimeLine
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

  //Config Options TimeLine
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
  $scope.dateDefault = moment();

  var buildTimeLine = function(){ //Begin buildTimeLine

      //Clear oldTimeLine
      $timeout(function () { $scope.timeline.clear({options: true}) });

      //Make TimeLine
      $timeout(function () { $scope.timeline.fit() });

      //Functions to events in TimeLine
      $timeout(function () {
        $scope.events = {
          rangechange: function (properties) {
            $timeout(function () {
              $scope.logs.rangechange = properties;
            });
          },
          rangechanged: function (properties) {
            $timeout(function () {
              $scope.logs.rangechanged = properties;
            });
          },
          timechange: function (properties) {
            $timeout(function () {
              $scope.logs.timechange = properties;
            });
          },
          timechanged: function (properties) {
            $timeout(function () {
              $scope.logs.timechanged = properties;
            });
          },
          select: function (properties) {
            $timeout(function () {
              $scope.logs.select = properties;

              var SelectedArticle = properties

              for(var i in SelectedArticle){
                 var item = SelectedArticle[i];
                 $scope.articleSelected = articleResource.get( { id : item } );
              }
          });
        }
      };

      $scope.data.load.on('*', function (event, properties) {
        $timeout(function () {
          $scope.logs.items = {
            event: event,
            properties: properties
          };
        });
      });
    });  

  }//End buildTimeLine

  /*---------- end Construction TimeLine ---------------*/

  /*---------- Select Option to category ----------------*/

  //SelectOption to Category
  $scope.selectCategorie = [
      {name:'All categories', value:1},
      {name:'Sort up', value:2},
      {name:'Sort Down', value:3},
      {name:'More articles', value:4}
    ];
  
  $scope.categorieDefault = $scope.selectCategorie[1];
  
  $scope.selectSort = function (){
    var valueSelected = $scope.categorieDefault.value;
    
    //console.log("click: " + valueSelected);
    $scope.orderData = orderCategories($scope.categories, $scope.articles, valueSelected);
    
    $scope.data = constructData($scope.categories, $scope.articles, valueSelected);

    buildTimeLine();

    //console.log("valor: "+valueSelected);
    //return valueSelected;
  };


  /*---------- end Select Option to category ----------------*/

  //Consult Data
  $scope.categories = undefined;
  $scope.articles = undefined;

  //Consult all categories
  categorieResource.query().$promise.then(
    function(categoriesData){
      $scope.categories  = categoriesData;
  });

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

   //Test contrusction time line
   $scope.groupCountTest = function (count, categoriesData, articlesData) {
          
      var data = {
            groups: [],
            items: []
      };

      for(var i in categoriesData){  
          var item = categoriesData[i];
          var id = item._id;
          var name = item.name; 
          if(i != '$promise' && i != '$resolved')
            data.groups.push({ id : id, content : name });
        }
      //data.groups.sort(sortUp);
  
      for(var x in articlesData){
          var item = articlesData[x];
          var date = new Date();

          var id = item._id;
          var group = item.category;
          var content = item.title;
          var start = item.created;
          date.setHours(date.getHours() + 2 + Math.floor(Math.random() * 4));
          var end = new Date(date);

          data.items.push({ id: id, group: group, start: start, end: end, content: content,  }); 
      }

/*
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
*/
          $scope.data = visDataSet(data);
  };
  //end Test contrusction time line     

  //Changes verify in categories
  $scope.$watch('categories',
    function(newValue, oldValue){
      if (angular.isUndefined(newValue) || newValue == null) return;
      
      //Consult all articles
      articleResource.query().$promise.then(
        function(data){
          $scope.articles = data;
      });

  });

  //Changes verify in articles
  $scope.$watch('articles',
    function(newValue, oldValue){
      if (angular.isUndefined(newValue) || newValue == null)return;
        
        $scope.orderData = orderCategories($scope.categories, $scope.articles, $scope.categorieDefault.value);
        //Construction data to TimeLine  
        $scope.data = constructData($scope.categories, $scope.articles, $scope.categorieDefault.value);
        //$scope.groupCountTest(30, $scope.categories, $scope.articles);
        //$scope.groupCount(30);
        buildTimeLine();  

  });

  //Changes verify in selectOption


  //Function Construct data to TimeLine
  var constructData = function(categoriesData, articlesData, valueSelected){

    var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();

    switch(valueSelected) {
      
      case 1:
        for(var i in categoriesData){  
          var item = categoriesData[i];
          var id = item._id;
          var name = item.name; 
          if(i != '$promise' && i != '$resolved')
            newCategories.push({ id : id, content : name, value:i });
        }
        newCategories.sort(sortUp);
  
        for(var x in articlesData){
          var item = articlesData[x];
          
          var id = item._id;
          var group = item.category;
          var content = item.title;
          var start = item.created;

          newArticles.push({ id: id, group: group, content: content, start: start }); 
        }
        break;

      case 2:
        for(var i in articlesData){
          var item = articlesData[i];
          
          var id = item._id;
          var group = item.category;
          var content = item.title;
          var start = item.created;

          for(var x in categoriesData){
            var itemCat = categoriesData[x];
            
            var idCat = itemCat._id;
            var name = itemCat.name; 
            
            if(idCat == group) 
                newCategoriesTemp.push({ id : idCat, content : name, value:x }); 
          }
          date.setHours(date.getHours() + 4 * (Math.random() < 0.2));
          var start2 = new Date(date);
          newArticles.push({ id: id, group: group, content: content, start: start2 }); 
        }  
        //newCategories.sort(sortUp); 
        newCategoriesTemp.sort(sortUp); 
        newCategories = deleteDuplicates(newCategoriesTemp);
      
        break;

      case 3:
        for(var i in articlesData){
          var item = articlesData[i];
          
          var id = item._id;
          var group = item.category;
          var content = item.title;
          var start = item.created;

          for(var x in categoriesData){
            var itemCat = categoriesData[x];
            
            var idCat = itemCat._id;
            var name = itemCat.name; 
            
            if(idCat == group) 
                newCategoriesTemp.push({ id : idCat, content : name, value:x }); 
          }
          newArticles.push({ id: id, group: group, content: content, start: start }); 
        }  
        //newCategories.sort(sortUp); 
        newCategoriesTemp.sort(sortUp); 
        newCategories = deleteDuplicates(newCategoriesTemp);
        newCategories.sort(sortDown);

        break;

      case 4:
        for(var i in articlesData){
            var item = articlesData[i];
            
            var id = item._id;
            var group = item.category;
            var content = item.title;
            var start = item.created;
            
              for(var x in categoriesData){
                var itemCat = categoriesData[x];
                var idCat = itemCat._id;
                var name = itemCat.name; 
                if(idCat == group){
                  newCategoriesTemp.push({ id : idCat, content : name, value:i, count: 1 }); 
                }
                  
              }
            newArticles.push({ id: id, group: group, content: content, start: start }); 
          }
          newCategoriesTemp.sort(sortUp); 
          newCategories = moreArticles(newCategoriesTemp);
        break;      
    }

    return visDataSet({ groups :newCategories , items :newArticles});

  } 

  /*---------- Function Order category ----------------*/
  //Sort Up
  function sortUp(a,b) {
      if (a.content < b.content)
       return -1;
      if (a.content > b.content)
        return 1;
      return 0;
  }
  //Sort Down
  function sortDown(a,b) {
      if (a.content < b.content)
       return 1;
      if (a.content > b.content)
        return -1;
      return 0;
  }
  //Sort Count
  function sortCount(a,b) {
      if (a.count < b.count)
       return 1;
      if (a.count > b.count)
        return -1;
      return 0;
  }
  //Delete duplicates
  function deleteDuplicates(data){
    var newCategories = [];

    for(var i in data){
            
      var y = parseInt('1');
      i = parseInt(i);
      var z = i + y;

      var item1 = data[i];
      var item2 = data[z];
            
      //console.log("array: "+item2+" ite:"+i);

      var id = item1.id;
      var name1 = item1.content;
      if(item2 != undefined) {
        var name2 = item2.content;
        //console.log("name: "+name1+" i: "+i+" name2: "+name2);
        if(name1 != name2){
          if(name1 != undefined){
            //console.log("conname: "+name1+" i: "+i+" conname2: "+name2);
            newCategories.push({ id : id, content : name1, value:i });  
          }
        }         
          
      } 
    }
    return newCategories;
  }

  //More Articles
  function moreArticles(data){
    var newCategories = [];
    var newCategoriesTemp = [];
    var countCategories = [];
    var count = parseInt(1);
    
    for(var i in data){
            
      var y = parseInt(1);
      i = parseInt(i);
      var z = i + y;

      var item1 = data[i];
      var item2 = data[z];
            
      var id = item1.id;
      var name1 = item1.content;
      if(item2 != undefined) {
        
        var name2 = item2.content;
        
        
        if(name1 == name2){ 
          count++;
        }else{
          count=1;
        }
      
        if(count > 0){
          
          
            var Newname1 = name1+" ("+count+") ";
            console.log("value: "+i+" count: "+count+" name: "+name1);
            countCategories.push({ value: i, count: count, name: name1, id: id });
          
        }  
                 
      } 
    }
    countCategories.sort(sortUp);
    for(var i in data){
      var y = parseInt(1);
      i = parseInt(i);
      var z = i + y;

      var item1 = data[i];
      var name1 = item1.content;
      var id    = item1.id;
      for(var x in countCategories){
        var countData = countCategories[x];
        var name2 = countData.name;
        var count1 = parseInt(countData.count);
        if(name1 == name2){
          for(var w in countCategories){
            var countData2 = countCategories[w];
            var name3 = countData2.name;
            var count2 = parseInt(countData2.count);

            if(name2 == name3){
              if(count1<=count2)
                count1 = count2;
            }
          }
          newCategoriesTemp.push({ id : id, content : name1, value:i, count: count1 });
        }
      }
      
    } 

    //delete duplicates
    for(var t in newCategoriesTemp){
            
      var y = parseInt('1');
      t = parseInt(t);
      var z = t + y;

      var item1 = newCategoriesTemp[t];
      var item2 = newCategoriesTemp[z];
            
      var id = item1.id;
      var name1 = item1.content;
      var count = item1.count;
      if(item2 != undefined) {
        var name2 = item2.content;
        //console.log("name: "+name1+" i: "+i+" name2: "+name2);
        if(name1 != name2){
          if(name1 != undefined){
            var countName = name1+" ("+count+") ";
            newCategories.push({ id : id, content : countName, value:i, name: name1, count: count });
          }
        }         
      } 
    } 
    newCategories.sort(sortCount);    
    return newCategories;
  }

  //Function OrderData
  var orderCategories = function(categoriesData, articlesData, valueSelected){
    var newCategories = [];
    var newCategoriesTemp = [];
    var newArticles = [];

    switch(valueSelected) {
      
      case 1:
        for(var i in categoriesData){  
          var item = categoriesData[i];
          var id = item._id;
          var name = item.name; 
          if(i != '$promise' && i != '$resolved')
            newCategories.push({ id : id, content : name, value:i });
        }
        newCategories.sort(sortUp);
  
        for(var x in articlesData){
          var item = articlesData[x];
          
          var id = item._id;
          var group = item.category;
          var content = item.title;
          var start = item.created;

          newArticles.push({ id: id, group: group, content: content, start: start }); 
        }
        break;

      case 2:
        for(var i in articlesData){
          var item = articlesData[i];
          
          var id = item._id;
          var group = item.category;
          var content = item.title;
          var start = item.created;

          for(var x in categoriesData){
            var itemCat = categoriesData[x];
            
            var idCat = itemCat._id;
            var name = itemCat.name; 
            
            if(idCat == group) 
                newCategoriesTemp.push({ id : idCat, content : name, value:x }); 
          }
          newArticles.push({ id: id, group: group, content: content, start: start }); 
        }  
        //newCategories.sort(sortUp); 
        newCategoriesTemp.sort(sortUp); 
        newCategories = deleteDuplicates(newCategoriesTemp);
        break;

      case 3:
        for(var i in articlesData){
          var item = articlesData[i];
          
          var id = item._id;
          var group = item.category;
          var content = item.title;
          var start = item.created;

          for(var x in categoriesData){
            var itemCat = categoriesData[x];
            
            var idCat = itemCat._id;
            var name = itemCat.name; 
            
            if(idCat == group) 
                newCategoriesTemp.push({ id : idCat, content : name, value:x }); 
          }
          newArticles.push({ id: id, group: group, content: content, start: start }); 
        }  
        //newCategories.sort(sortUp); 
        newCategoriesTemp.sort(sortUp); 
        newCategories = deleteDuplicates(newCategoriesTemp);
        newCategories.sort(sortDown);
        break;

      case 4:
        for(var i in articlesData){
            var item = articlesData[i];
            
            var id = item._id;
            var group = item.category;
            var content = item.title;
            var start = item.created;
            
            //if(i != '$promise' && i != '$resolved'){
              for(var x in categoriesData){
                var itemCat = categoriesData[x];
                var idCat = itemCat._id;
                var name = itemCat.name; 
                if(idCat == group){
                  //console.log("id: "+idCat+" name: "+name+" value: "+i);
                  newCategoriesTemp.push({ id : idCat, content : name, value:i, count: 1 }); 
                  //newCategoriesTemp.push({ id : idCat, content : name, value:i, count: 1 }); 
                }
                  
              }
            //}

            newArticles.push({ id: id, group: group, content: content, start: start }); 
          }
          newCategoriesTemp.sort(sortUp); 
          newCategories = moreArticles(newCategoriesTemp);

          break;      
    }  
    return newCategories;
    //return visDataSet({ groups :newCategories , items :newArticles});
  }

  /*---------- End Function Order category ----------------*/  

  });
