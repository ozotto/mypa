/*----- OrderData to Timeline --------*/  
  var dataAllSortTimePoint = function(visDataSet, categoriesData, articlesData, historicData, favoritesData){

  	var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();

    var i, x, j, itemArticle, idArticle, idCatInArt, titleArt, startArt, itemCategory, idCategory, nameCategory, itemInCategories, isRegistred;
    var style = "normal";
    var randomIcon, valueIcon;

	for(i in articlesData){    
		itemArticle = articlesData[i];
		idArticle = itemArticle._id;
		if (idArticle != undefined){
			idCatInArt 	= itemArticle.category;
			randomIcon = Math.floor((Math.random() * 4) + 1);
			if(randomIcon == 1) valueIcon = "fi-photo";
			if(randomIcon == 2) valueIcon = "fi-video";
			if(randomIcon == 3) valueIcon = "fi-edit";
			if(randomIcon == 4) valueIcon = "fi-burst";
			
			var textTime = "text"+idArticle;
			titleArt 	= "<div onmousemove=myMoveFunction('"+idArticle+"') onmouseout=myMoveFunction2('"+idArticle+"') id="+idArticle+"><a id='itemsPoint'><i class='"+valueIcon+"'> </i><div id="+textTime+" style=display:none>"+ itemArticle.title+"</div></a></div>";

			startArt 	= new Date(itemArticle.created);

			for(x in categoriesData){
		        itemCategory	= categoriesData[x];
		        idCategory 		= itemCategory._id;
		        if (idCategory != undefined){
			        nameCategory 	= "<a onclick=changeCategory('"+idCategory+"')>"+itemCategory.name+"</a>";
			          
			        if(idCategory == idCatInArt){ 
			        	isRegistred = false;
			        	for(j in newCategories){
			        		itemInCategories = newCategories[j];
			        		if(idCategory == itemInCategories.id){
			        			isRegistred = true;
			        		}
			        	}
			        	if(isRegistred == false)
			            	newCategories.push({ id : idCategory, content : nameCategory, value:x }); 
			        }    
			    }    
		    }
		    newArticles.push({ id: idArticle, group: idCatInArt, content: titleArt, start: startArt, type: 'point' }); 
		}	
	}	

	var cant, dateEmpty;
	cant = newCategories.length;
    if(cant == 0){
    	dateEmpty = moment().format();
    	newCategories.push({ id : 1, content : "Category" });
    	newArticles.push({ id: 1, group: 1, content: "", start: dateEmpty, type: 'point' });
    }

	return visDataSet({ groups :newCategories , items :newArticles});

  };


  var dataAllTimePoint = function(visDataSet, categoriesData, articlesData, historicData, favoritesData){

    var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();

    var i, x, j, itemArticle, idArticle, idCatInArt, titleArt, startArt, itemCategory, idCategory, nameCategory, itemInCategories, isRegistred;
    var style = "normal";
    var randomIcon, valueIcon;

	for(i in articlesData){    
		itemArticle = articlesData[i];
		idArticle = itemArticle._id;
		if (idArticle != undefined){
			idCatInArt 	= itemArticle.category;
			
			randomIcon = Math.floor((Math.random() * 4) + 1);
			if(randomIcon == 1) valueIcon = "fi-photo";
			if(randomIcon == 2) valueIcon = "fi-video";
			if(randomIcon == 3) valueIcon = "fi-edit";
			if(randomIcon == 4) valueIcon = "fi-burst";
			
			var textTime = "text"+idArticle;
			titleArt 	= "<div onmousemove=myMoveFunction('"+idArticle+"') onmouseout=myMoveFunction2('"+idArticle+"') id="+idArticle+"><a id='itemsPoint'><i class='"+valueIcon+"'> </i><div id="+textTime+" style=display:none>"+ itemArticle.title+"</div></a></div>";
			
			startArt 	= new Date(itemArticle.created);

		    newArticles.push({ id: idArticle, group: idCatInArt, content: titleArt, start: startArt, type: 'point' }); 
		}	
	}	
	
	for(x in categoriesData){
		        itemCategory	= categoriesData[x];
		        idCategory 		= itemCategory._id;
		        if (idCategory != undefined){
		        	nameCategory 	= "<a onclick=changeCategory('"+idCategory+"')>"+itemCategory.name+"</a>";
		            
		        //if(idCategory == idCatInArt) 
		            newCategories.push({ id : idCategory, content : nameCategory, value:x }); 
		        }	
		        
		   	}
	
	var cant, dateEmpty;
	cant = newCategories.length;
    if(cant == 0){
    	dateEmpty = moment().format();
    	newCategories.push({ id : 1, content : "Category" });
    	newArticles.push({ id: 1, group: 1, content: "", start: dateEmpty, type: 'point' });
    }

	return visDataSet({ groups :newCategories , items :newArticles});

  };



var dataMoreTimePoint = function(visDataSet, categoriesData, articlesData, historicData, favoritesData){

  	var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();
    var randomIcon, valueIcon;

    var i, x, j, itemArticle, idArticle, idCatInArt, titleArt, startArt, itemCategory, idCategory, nameCategory, itemInCategories, isRegistred;
    var style = "normal";
    var count = parseInt(1), countCategory;

	for(i in articlesData){    
		itemArticle = articlesData[i];
		idArticle = itemArticle._id;
		if (idArticle != undefined){
			idCatInArt 	= itemArticle.category;
			
			randomIcon = Math.floor((Math.random() * 4) + 1);
			if(randomIcon == 1) valueIcon = "fi-photo";
			if(randomIcon == 2) valueIcon = "fi-video";
			if(randomIcon == 3) valueIcon = "fi-edit";
			if(randomIcon == 4) valueIcon = "fi-burst";
			
			var textTime = "text"+idArticle;
			titleArt 	= "<div onmousemove=myMoveFunction('"+idArticle+"') onmouseout=myMoveFunction2('"+idArticle+"') id="+idArticle+"><a id='itemsPoint'><i class='"+valueIcon+"'> </i><div id="+textTime+" style=display:none>"+ itemArticle.title+"</div></a></div>";

			startArt 	= new Date(itemArticle.created);

			for(x in categoriesData){
		        itemCategory	= categoriesData[x];
		        idCategory 		= itemCategory._id;
		        if (idCategory != undefined){
			        nameCategory 	= "<a onclick=changeCategory('"+idCategory+"')>"+itemCategory.name+" ["+ count+"]</a>";
			          
			        if(idCategory == idCatInArt){ 
			        	isRegistred = false;
			        	for(j in newCategories){
			        		itemInCategories = newCategories[j];
			        		if(idCategory == itemInCategories.id){
			        			isRegistred = true;
			        			countCategory = itemInCategories.value + 1;
			        			nameCategory 	= "<a onclick=changeCategory('"+idCategory+"')>"+itemCategory.name+" ["+ countCategory+"]</a>";
			        			newCategories[j].value=countCategory;
			        			newCategories[j].content=nameCategory; 
			        		}
			        	}
			        	if(isRegistred == false)
			            	newCategories.push({ id : idCategory, content : nameCategory, value:count }); 
			        }    
			    }    
		    }
		    newArticles.push({ id: idArticle, group: idCatInArt, content: titleArt, start: startArt, type: 'point' }); 
		}	
	}	

	var cant, dateEmpty;
	cant = newCategories.length;
    if(cant == 0){
    	dateEmpty = moment().format();
    	newCategories.push({ id : 1, content : "Category" });
    	newArticles.push({ id: 1, group: 1, content: "", start: dateEmpty, type: 'point' });
    }

	newCategories.sort(sortUpMore);
	return visDataSet({ groups :newCategories , items :newArticles});

  };

  var dataAllFavoritesPoint = function(visDataSet, categoriesData, articlesData, historicData, favoritesData){

  	var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();
    var randomIcon, valueIcon;

    var i, x, j, z, itemArticle, idArticle, idCatInArt, titleArt, startArt, itemCategory, idCategory, nameCategory, itemInCategories, isRegistred;
    var style = "normal";
    var itemFavorite, idFavorite;
    var cant, dateEmpty;

    for(z in favoritesData){  
    	itemFavorite = favoritesData[z];
    	idFavorite = itemFavorite.idArticle;
		if (idFavorite != undefined){
			for(i in articlesData){    
				itemArticle = articlesData[i];
				idArticle = itemArticle._id;
				if (idArticle == idFavorite){
					idCatInArt 	= itemArticle.category;
					
					randomIcon = Math.floor((Math.random() * 4) + 1);
					if(randomIcon == 1) valueIcon = "fi-photo";
					if(randomIcon == 2) valueIcon = "fi-video";
					if(randomIcon == 3) valueIcon = "fi-edit";
					if(randomIcon == 4) valueIcon = "fi-burst";
					
					var textTime = "text"+idArticle;
					titleArt 	= "<div onmousemove=myMoveFunction('"+idArticle+"') onmouseout=myMoveFunction2('"+idArticle+"') id="+idArticle+"><a id='itemsPoint'><i class='"+valueIcon+"'> </i><div id="+textTime+" style=display:none>"+ itemArticle.title+"</div></a></div>";
			
					startArt 	= new Date(itemArticle.created);

					for(x in categoriesData){
				        itemCategory	= categoriesData[x];
				        idCategory 		= itemCategory._id;
				        if (idCategory != undefined){
					        nameCategory 	= "<a onclick=changeCategory('"+idCategory+"')>"+itemCategory.name+"</a>";
					          
					        if(idCategory == idCatInArt){ 
					        	isRegistred = false;
					        	for(j in newCategories){
					        		itemInCategories = newCategories[j];
					        		if(idCategory == itemInCategories.id){
					        			isRegistred = true;
					        		}
					        	}
					        	if(isRegistred == false)
					            	newCategories.push({ id : idCategory, content : nameCategory, value:x }); 
					        }    
					    }    
				    }
				    newArticles.push({ id: idArticle, group: idCatInArt, content: titleArt, start: startArt, type: 'point' }); 
				}	
			}		
		}	
    }	

    cant = newCategories.length;
    if(cant == 0){
    	dateEmpty = moment().format();
    	newCategories.push({ id : 1, content : "Favorites" });
    	newArticles.push({ id: 1, group: 1, content: "", start: dateEmpty, type: 'point' });
    }

	return visDataSet({ groups :newCategories , items :newArticles});

  };


  var dataAllHistoryPoint = function(visDataSet, categoriesData, articlesData, historicData, favoritesData){

  	var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();
    var randomIcon, valueIcon;

    var i, x, j, z, itemArticle, idArticle, idCatInArt, titleArt, startArt, itemCategory, idCategory, nameCategory, itemInCategories, isRegistred;
    var style = "normal";
    var itemHistory, idHistory;
    var cantHistory, dateEmpty;

    for(z in historicData){  
    	itemHistory = historicData[z];
    	idHistory = itemHistory.idArticle;
		if (idHistory != undefined){
			for(i in articlesData){    
				itemArticle = articlesData[i];
				idArticle = itemArticle._id;
				if (idArticle == idHistory){
					idCatInArt 	= itemArticle.category;
					
					randomIcon = Math.floor((Math.random() * 4) + 1);
					if(randomIcon == 1) valueIcon = "fi-photo";
					if(randomIcon == 2) valueIcon = "fi-video";
					if(randomIcon == 3) valueIcon = "fi-edit";
					if(randomIcon == 4) valueIcon = "fi-burst";
					
					var textTime = "text"+idArticle;
					titleArt 	= "<div onmousemove=myMoveFunction('"+idArticle+"') onmouseout=myMoveFunction2('"+idArticle+"') id="+idArticle+"><a id='itemsPoint'><i class='"+valueIcon+"'> </i><div id="+textTime+" style=display:none>"+ itemArticle.title+"</div></a></div>";
			
					startArt 	= new Date(itemArticle.created);

					for(x in categoriesData){
				        itemCategory	= categoriesData[x];
				        idCategory 		= itemCategory._id;
				        if (idCategory != undefined){
					        nameCategory 	= "<a onclick=changeCategory('"+idCategory+"')>"+itemCategory.name+"</a>";
					          
					        if(idCategory == idCatInArt){ 
					        	isRegistred = false;
					        	for(j in newCategories){
					        		itemInCategories = newCategories[j];
					        		if(idCategory == itemInCategories.id){
					        			isRegistred = true;
					        		}
					        	}
					        	if(isRegistred == false)
					            	newCategories.push({ id : idCategory, content : nameCategory, value:x }); 
					        }    
					    }    
				    }
				    newArticles.push({ id: idArticle, group: idCatInArt, content: titleArt, start: startArt, type: 'point' }); 
				}	
			}		
		}	
    }	

    cantHistory = newCategories.length;
    if(cantHistory == 0){
    	dateEmpty = moment().format();
    	newCategories.push({ id : 1, content : "History" });
    	newArticles.push({ id: 1, group: 1, content: "", start: dateEmpty, type: 'point' });
    }

	return visDataSet({ groups :newCategories , items :newArticles});

  };

 var dataOnlyCategoryPoint = function(visDataSet, categoriesData, articlesData, categorySelected){

  var newCategories = [];
  var newArticles = [];
  var i, j, itemCategory, idCategory, nameCategory;
  var itemArticle, idArticle, idCatInArt, titleArt, startArt;
  var randomIcon, valueIcon;

  for(i in categoriesData){  
    itemCategory = categoriesData[i];
    idCategory = itemCategory._id;
    if (idCategory != undefined){
    	if (idCategory == categorySelected){
    		nameCategory = itemCategory.name; 
    		newCategories.push({ id : idCategory, content : nameCategory});
    	}	
    }	
  }  

  for(j in articlesData){
    itemArticle = articlesData[j];
    idArticle = itemArticle._id;
    if (idArticle != undefined){
      idCatInArt = itemArticle.category;
      if(idCatInArt == categorySelected){
        
      	randomIcon = Math.floor((Math.random() * 4) + 1);
					if(randomIcon == 1) valueIcon = "fi-photo";
					if(randomIcon == 2) valueIcon = "fi-video";
					if(randomIcon == 3) valueIcon = "fi-edit";
					if(randomIcon == 4) valueIcon = "fi-burst";
					
					var textTime = "text"+idArticle;
					titleArt 	= "<div onmousemove=myMoveFunction('"+idArticle+"') onmouseout=myMoveFunction2('"+idArticle+"') id="+idArticle+"><a id='itemsPoint'><i class='fi-burst'> </i><div id="+textTime+" style=display:none>"+ itemArticle.title+"</div></a></div>";


        startArt = new Date(itemArticle.created);
        newArticles.push({
          id: idArticle,
          group: idCatInArt,
          content: titleArt,
          start: startArt, type: 'point'
        });
      }
    }  
  }
  return visDataSet({ groups :newCategories , items :newArticles});
  
  };


  //Sort Up
  function sortUpMore(a,b) {
      if (a.value < b.value)
       return 1;
      if (a.value > b.value)
        return -1;
      return 0;
  }











