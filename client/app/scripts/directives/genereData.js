/*-----------  Genere Data to TimeLine ------------*/
function generateData (visDataSet, categoriesData, articlesData, valueSelected, historicData, favoritesData) {
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
            "<div onmousemove=myMoveFunction()>"+item.title+"</div><br>"+"<i class='fi-heart deselect'> </i><i class='fi-eye deselect'> </i>";
            
            	
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

function changeVisual (visDataSet, categoriesData, articlesData, valueCheck, historicData, favoritesData) {
	var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();

    switch(valueCheck) {
      
      case 0:
      	for(var i in articlesData){
          	var item = articlesData[i];
          
          	var id = item._id;
          	if (id != undefined){
	          	var group = item.category;
	          	/*var content = item.title;*/
	          	var textTime = "text"+id;
				var content = "<div onmousemove=myMoveFunction('"+id+"') onmouseout=myMoveFunction2('"+id+"') id="+id+"><a id='itemsPoint'><i class='fi-burst'> </i><div id="+textTime+" style=display:none>"+ item.title+"</div></a></div>";
	          	var start = new Date(item.created);

	          	for(var x in categoriesData){
		            var itemCat = categoriesData[x];
		            
		            var idCat = itemCat._id;
		            var name = itemCat.name; 
		            
	            	if(idCat == group) 
	                	newCategoriesTemp.push({ id : idCat, content : name, value:x }); 
	          	}
	          	newArticles.push({ id: id, group: group, content: content, start: start, type: 'point' }); 
	      	}    
        }  
        //newCategories.sort(sortUp); 
        newCategoriesTemp.sort(sortUp); 
        newCategories = deleteDuplicates(newCategoriesTemp);
        break;

    }  
	return visDataSet({ groups :newCategories , items :newArticles});	
};	

