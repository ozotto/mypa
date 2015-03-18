/*----- OrderData to Timeline --------*/
  var genereData2 = function(categoriesData, articlesData, visDataSet){
    var newCategories = [];
    var newCategoriesTemp = [];
    var newArticles = [];
    
    for(var i in articlesData){
      var item = articlesData[i];
          
      var id = item._id;
      if (id != undefined){
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
    }  
      
    newCategoriesTemp.sort(sortUp); 
    newCategories = deleteDuplicates(newCategoriesTemp);
    return visDataSet({ groups :newCategories , items :newArticles});
  }; 

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
            //console.log("value: "+i+" count: "+count+" name: "+name1);
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

/////////////////////////////////////
  //Function Construct data to TimeLine
  var constructData = function(visDataSet, categoriesData, articlesData, valueSelected, historicData, favoritesData){

    var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();

    switch(valueSelected) {
      
      case 1:
        for(var i in categoriesData){  
          var item = categoriesData[i];
          var id = item._id;
          if (id != undefined){
	          //var name = item.name; 
            var name = "<a onclick=changeCategory('"+id+"')>"+item.name+"</a>";
	          if(i != '$promise' && i != '$resolved')
	            newCategories.push({ id : id, content : name, value:i });
	      }  
        }
        newCategories.sort(sortUp);
  
        for(var x in articlesData){
          var item = articlesData[x];
          
          var id = item._id;
          if (id != undefined){
	          var group = item.category;
	          var content = item.title;
	          var start = new Date(item.created);

	          newArticles.push({ id: id, group: group, content: content, start: start }); 
	      }   
        }
        break;

      case 2:
        for(var i in articlesData){
          	var item = articlesData[i];
          
          	var id = item._id;
          	if (id != undefined){
		        var group = item.category;
		        var content = 
            item.title+"<br>"+"<i class='fi-heart deselect'> </i><i class='fi-eye deselect'> </i>";
		        var start = new Date(item.created);
            var style = "normal";

            var isHistoric = 0;
            //Look for Historic in article
            for(var j in historicData){
              var dataHistoric = historicData[j];
              var idHistoric = dataHistoric.idArticle;
              if(id == idHistoric){
                //var style = "orange";
                content = item.title+"<br>"+"<i class='fi-heart'> </i><i class='fi-eye checkEye'> </i>"; 
                isHistoric = 1;
              }
            }

            //Look for favorite in article
            for(var z in favoritesData){
              var dataFavorite = favoritesData[z];
              var idFavorite = dataFavorite.idArticle;
              if(id == idFavorite){
                //var style = "classFavorite";
                if(isHistoric == 1){
                  content = item.title+"<br>"+"<i class='fi-heart checkHeart'> </i><i class='fi-eye ckeckEye'> </i>";  
                }else{
                  content = item.title+"<br>"+"<i class='fi-heart checkHeart'> </i><i class='fi-eye deselect'> </i>";  
                }
                
              }
            }

            //Look for Category by Article
		        for(var x in categoriesData){
		        	var itemCat = categoriesData[x];
		            
		            var idCat = itemCat._id;
		            var nameCategory = itemCat.name; 
		            var name = "<a onclick=changeCategory('"+idCat+"')>"+itemCat.name+"</a>";
		            if(idCat == group) 
		                newCategoriesTemp.push({ id : idCat, content : name, value:x }); 
		        }
		        newArticles.push({ id: id, group: group, content: content, start: start, className: style }); 
	      	}      
        } 
        /*
        var myId, myGroup, myContent, myStart;
        myId = 11111;
        myGroup = group;
        myContent = "ViewMore";
        myStart = "1-11-2014"; 
        newArticles.push({ id: myId, group: myGroup, content: myContent, start: myStart }); 
        */
        newCategoriesTemp.sort(sortUp); 
        newCategories = deleteDuplicates(newCategoriesTemp);
      
        break;

      case 3:
        for(var i in articlesData){
          	var item = articlesData[i];
          
          	var id = item._id;
          	if (id != undefined){
	          	var group = item.category;
	          	var content = item.title;
	          	var start = new Date(item.created);

	          	for(var x in categoriesData){
		            var itemCat = categoriesData[x];
		            
		            var idCat = itemCat._id;
		            var name = itemCat.name; 
		            
	            	if(idCat == group) 
	                	newCategoriesTemp.push({ id : idCat, content : name, value:x }); 
	          	}
	          	newArticles.push({ id: id, group: group, content: content, start: start }); 
	      	}    
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
            if (id != undefined){
	            var group = item.category;
	            var content = item.title;
	            var start = new Date(item.created);
	            
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
          }
          newCategoriesTemp.sort(sortUp); 
          newCategories = moreArticles(newCategoriesTemp);
        break;      
    }

    return visDataSet({ groups :newCategories , items :newArticles});

  };

//-------
var constructDataCategory = function(visDataSet, categoriesData, articlesData, categorySelected){

  var newCategories = [];
  var newArticles = [];
  
  for(var i in categoriesData){  
    var itemCategory = categoriesData[i];
    var idCategory = itemCategory._id;
    if (idCategory == categorySelected){
      var nameCategory = itemCategory.name; 
      if(i != '$promise' && i != '$resolved')
        newCategories.push({ id : idCategory, content : nameCategory, value:i });
    }  
  }  

  for(var i in articlesData){
    var item = articlesData[i];
    var id = item._id;
    if (id != undefined){
      var category = item.category;
      if(category == categorySelected){
        var content = item.title;
        var start = new Date(item.created);
        newArticles.push({
          id: id,
          group: categorySelected,
          content: content,
          start: start
        });
      }
    }  
  }
  return visDataSet({ groups :newCategories , items :newArticles});
  //return visDataSet(data);  
  
};

//Contruct Data to historic articles
var constructHistoric = function(visDataSet, categoriesData, articlesData, historicData){

  var newCategories = [];
  var newArticles = [];
  var newCategoriesTemp = [];
  var inserted = 0;

  for(var j in historicData){
    var dataHistoric = historicData[j];
    var idHistoric = dataHistoric._id;
    if(idHistoric != undefined){
      var articleHistory = dataHistoric.idArticle;
      for(var i in articlesData){
        var item = articlesData[i];
        var id = item._id;
        if (id == articleHistory){
          var group = item.category;
          var content = item.title;
          var start = new Date(item.created); 
          for(var x in categoriesData){
            var itemCat = categoriesData[x];    
            var idCat = itemCat._id;
            var name = itemCat.name; 
                
            if(idCat == group) 
              newCategoriesTemp.push({ id : idCat, content : name, value:x }); 
          }
          newArticles.push({ id: id, group: group, content: content, start: start });
          inserted = 1;
        }  
      }
    }
  }
  newCategoriesTemp.sort(sortUp); 
  //newCategories = deleteDuplicates(newCategoriesTemp);
  newCategories = newCategoriesTemp;

  if(inserted == 1){
    return visDataSet({ groups :newCategories , items :newArticles});  
  }else{
    return inserted;
  }              
};

//Contruct Data to favorites articles
var constructFavorites = function(visDataSet, categoriesData, articlesData, favoritesData){

  var newCategories = [];
  var newArticles = [];
  var newCategoriesTemp = [];
  var inserted = 0;

  for(var j in favoritesData){
    var dataFavorite = favoritesData[j];
    var idFavorite = dataFavorite._id;
    if(idFavorite != undefined){
      var articleFavorite = dataFavorite.idArticle;
      for(var i in articlesData){
        var item = articlesData[i];
        var id = item._id;
        if (id == articleFavorite){
          var group = item.category;
          var content = item.title;
          var start = new Date(item.created); 
          for(var x in categoriesData){
            var itemCat = categoriesData[x];    
            var idCat = itemCat._id;
            var name = itemCat.name; 
                
            if(idCat == group) 
              newCategoriesTemp.push({ id : idCat, content : name, value:x }); 
          }
          newArticles.push({ id: id, group: group, content: content, start: start });
          inserted = 1;
        }  
      }
    }
  }
  newCategoriesTemp.sort(sortUp); 
  //newCategories = deleteDuplicates(newCategoriesTemp);
  newCategories = newCategoriesTemp;

  if(inserted == 1){
    return visDataSet({ groups :newCategories , items :newArticles});  
  }else{
    return inserted;
  }              
};


