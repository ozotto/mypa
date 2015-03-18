'use strict';

//var ngVisApp = angular.module('ngVisApp', ['ngVis']);

angular.module('clientApp')
  .controller('controlTestHome2', function ($scope, $location, $timeout, visDataSet, categorieResource, articleResource) {

  $scope.logs = {};

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

  var options = {
    template: function (item) { 
      return '<h1 tooltip="After today restriction">' + item.header + '</h1><p>' + item.description + '</p>';
    }
  };

  var sampleData = function () {
    return visDataSet([
      { id: 77,
        content: '<i class="fi-flag"></i> simple',
        start: moment().add('days', 1),
        className: 'magenta' },
      { id: 2,
        content: '<a tooltip="After today restriction" href="http://visjs.org" target="_blank">visjs.org</a>',
        start: moment().add('days', 2) },
      { id: 3,
        //content: "<button onclick='viewArticle(category)>' item 3</button>",
        content: "<a ng-click='inLink()'> item 3</a>",
        start: moment().add('days', -2) },
      { id: 4,
        content: '<div onclick="myFunction()" >vamossss</div>',
        start: moment().add('days', 1),
        end: moment().add('days', 3),
        type: 'range' },
      { id: 7,
        content: '<i class="fi-anchor"></i> item 7',
        start: moment().add('days', -3),
        end: moment().add('days', -2),
        type: 'range',
        className: 'orange' },
      { id: 5,
        content: '<div class="test">item 5</div>',
        start: moment().add('days', -1),
        type: 'point' },
      { id: 6,
        content: 'item 6',
        start: moment().add('days', 4),
        type: 'point' }
    ]);
  };

  var groupCount = function () {
    return visDataSet({
          groups: [
            {id: 0, content: 'First', value: 1},
            {id: 1, content: 'Third', value: 3},
            {id: 2, content: 'Second', value: 2}
          ],
          items: [
            {id: 0, group: 0, content: 'item 0', start: new Date(2014, 3, 17), end: new Date(2014, 3, 21)},
            {id: 1, group: 0, content: 'item 1', start: new Date(2014, 3, 19), end: new Date(2014, 3, 20)},
            {id: 2, group: 1, content: 'item 2', start: new Date(2014, 3, 16), end: new Date(2014, 3, 24)},
            {id: 3, group: 1, content: 'item 3', start: new Date(2014, 3, 23), end: new Date(2014, 3, 24)},
            {id: 4, group: 1, content: 'item 4', start: new Date(2014, 3, 22), end: new Date(2014, 3, 26)},
            {id: 5, group: 2, content: 'item 5', start: new Date(2014, 3, 24), end: new Date(2014, 3, 27)}
          ]
        });
  };

  var groupCount2 = function (){
    return visDataSet ({});
  }

  var now = moment().minutes(0).seconds(0).milliseconds(0);

  //Consult all categories
  categorieResource.query().$promise.then(
    function(categoriesData){
      $scope.categories  = categoriesData;
  });

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
  
/*  //Consult all articles
  articleResource.query().$promise.then(
    function(data){
          $scope.articles = data;
  });
  */

$scope.verValor = "hola";

//$scope.data = sampleData();
/*$scope.options = angular.extend(options, {  
    editable: true
});*/
//$timeout(function () { $scope.timeline.fit() });

  //List Articles
  $scope.$watch('articles',
    function(newValue, oldValue){
      if (angular.isUndefined(newValue) || newValue == null) return;
      //$scope.data = groupCount();

  		$scope.data = genereData3($scope.categories, $scope.articles);
      $scope.dataArticles = genereData($scope.articles);
      $scope.dataGroups = genereData2($scope.categories, $scope.articles);	 
      //$timeout(function () { $scope.timeline.fit() });

  });

  $timeout(function () { $scope.timeline.fit() });

  var genereData = function(articlesData){
  	var newArticles = [];
  	
  	for(var x in articlesData){
        var item = articlesData[x];
          
        var id = item._id;
        if (id != undefined){
          var content = item.title;
          var start = new Date(item.created);
  		    newArticles.push({ id: id, content: content, start: start }); 
        }   
    }
    return visDataSet(newArticles);
    //return newArticles;
  };	

  var genereData3 = function(categoriesData, articlesData){
    var newCategories = [];
    var newCategoriesTemp = [];
    var newArticles = [];
    
    for(var i in articlesData){
      var item = articlesData[i];
          
      var id = item._id;
      if (id != undefined){
        var group = item.category;
        var content = "<a onclick='myFunction()'>"+item.title+"</a>";
        var start = item.created;

        for(var x in categoriesData){
          var itemCat = categoriesData[x];
              
          var idCat = itemCat._id;
          //var name = "<a ng-click='setScope('week')'>"+itemCat.name+"</a>";
          var name = "<a onclick='myFunction2()'>"+itemCat.name+"</a>";
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
    return visDataSet({ groups :newCategories , items :newArticles});
  };  
  
  function sortUp(a,b) {
      if (a.content < b.content)
       return -1;
      if (a.content > b.content)
        return 1;
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

  $scope.viewArticle = function(article){
  	$scope.article = articleResource.get( { id : article } );
  };  

  //Create TimeLine
  /*$timeout(function () { $scope.timeline.clear({options: true}) });
  $scope.data = sampleData();		
  //$scope.groupCount(10);
  $scope.options = angular.extend(options, {});
  $timeout(function () { $scope.timeline.fit() });*/
  //$scope.data = sampleData();  
  //$timeout(function () { $scope.timeline.fit() });

  //Function Events TimeLine
  $timeout(function () {
  	$scope.events = {
  		select: function(properties){
  			$timeout(function () {
  				$scope.logs.select = properties;
          var SelectedArticle = properties

              for(var i in SelectedArticle){
                 var item = SelectedArticle[i];
                 $scope.articleSelected = articleResource.get( { id : item } );
                 if(item == 11111){
                    alert("desde event");
                    $scope.data = vamosPod(sampleData());

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

  $scope.clickme = function(){
    alert("hello");
  }
  $scope.mouseOver = function(){
    alert("hello2");
  }
  //Load Data
  $scope.saveData = function () {
    var txtData = document.getElementById('data');
    var data = JSON.parse(txtData.value);

    $scope.data.load.clear();
    $scope.data.load.update(data);

    $scope.timeline.fit();
  };

});
