/*----- OrderData to Timeline --------*/  
  var dataAllSortTime = function(visDataSet, categoriesData, articlesData, historicData, favoritesData){

  	var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();

    var i, x, j, itemArticle, idArticle, idCatInArt, titleArt, startArt, itemCategory, idCategory, nameCategory, itemInCategories, isRegistred;
    var style = "normal";

	for(i in articlesData){    
		itemArticle = articlesData[i];
		idArticle = itemArticle._id;
		if (idArticle != undefined){
			idCatInArt 	= itemArticle.category;
			//titleArt 	= itemArticle.title;
			titleArt 	= "<div onmousemove=myMoveItem('"+idArticle+"') onmouseout=myMoveItem2('"+idArticle+"') id="+idArticle+">"+ itemArticle.title+"</div>";
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
		    newArticles.push({ id: idArticle, group: idCatInArt, content: titleArt, start: startArt, className: style }); 
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


  var dataAllTime = function(visDataSet, categoriesData, articlesData, historicData, favoritesData){

    var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();

    var i, x, j, itemArticle, idArticle, idCatInArt, titleArt, startArt, itemCategory, idCategory, nameCategory, itemInCategories, isRegistred;
    var style = "normal";

	for(i in articlesData){    
		itemArticle = articlesData[i];
		idArticle = itemArticle._id;
		if (idArticle != undefined){
			idCatInArt 	= itemArticle.category;
			//titleArt 	= itemArticle.title;
			titleArt 	= "<div onmousemove=myMoveItem('"+idArticle+"') onmouseout=myMoveItem2('"+idArticle+"') id="+idArticle+">"+ itemArticle.title+"</div>";
			startArt 	= new Date(itemArticle.created);

		    newArticles.push({ id: idArticle, group: idCatInArt, content: titleArt, start: startArt, className: style }); 
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



var dataMoreTime = function(visDataSet, categoriesData, articlesData, historicData, favoritesData){

  	var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();

    var i, x, j, itemArticle, idArticle, idCatInArt, titleArt, startArt, itemCategory, idCategory, nameCategory, itemInCategories, isRegistred;
    var style = "normal";
    var count = parseInt(1), countCategory;

	for(i in articlesData){    
		itemArticle = articlesData[i];
		idArticle = itemArticle._id;
		if (idArticle != undefined){
			idCatInArt 	= itemArticle.category;
			//titleArt 	= itemArticle.title;
			titleArt 	= "<div onmousemove=myMoveItem('"+idArticle+"') onmouseout=myMoveItem2('"+idArticle+"') id="+idArticle+">"+ itemArticle.title+"</div>";
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
		    newArticles.push({ id: idArticle, group: idCatInArt, content: titleArt, start: startArt, className: style }); 
		}	
	}	

	newCategories.sort(sortUpMore);

	var cant, dateEmpty;
	cant = newCategories.length;
    if(cant == 0){
    	dateEmpty = moment().format();
    	newCategories.push({ id : 1, content : "Category" });
    	newArticles.push({ id: 1, group: 1, content: "", start: dateEmpty, type: 'point' });
    }

	return visDataSet({ groups :newCategories , items :newArticles});

  };

  var dataAllFavorites = function(visDataSet, categoriesData, articlesData, historicData, favoritesData){

  	var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();

    var i, x, j, z, itemArticle, idArticle, idCatInArt, titleArt, startArt, itemCategory, idCategory, nameCategory, itemInCategories, isRegistred;
    var style = "normal";
    var itemFavorite, idFavorite;

    for(z in favoritesData){  
    	itemFavorite = favoritesData[z];
    	idFavorite = itemFavorite.idArticle;
		if (idFavorite != undefined){
			for(i in articlesData){    
				itemArticle = articlesData[i];
				idArticle = itemArticle._id;
				if (idArticle == idFavorite){
					idCatInArt 	= itemArticle.category;
					//titleArt 	= itemArticle.title;
					titleArt 	= "<div onmousemove=myMoveItem('"+idArticle+"') onmouseout=myMoveItem2('"+idArticle+"') id="+idArticle+">"+ itemArticle.title+"</div>";
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
				    newArticles.push({ id: idArticle, group: idCatInArt, content: titleArt, start: startArt, className: style }); 
				}	
			}		
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


  var dataAllHistory = function(visDataSet, categoriesData, articlesData, historicData, favoritesData){

  	var newCategories = [];
    var newArticles = [];
    var newCategoriesTemp = [];
    var date = new Date();

    var i, x, j, z, itemArticle, idArticle, idCatInArt, titleArt, startArt, itemCategory, idCategory, nameCategory, itemInCategories, isRegistred;
    var style = "normal";
    var itemHistory, idHistory;

    for(z in historicData){  
    	itemHistory = historicData[z];
    	idHistory = itemHistory.idArticle;
		if (idHistory != undefined){
			for(i in articlesData){    
				itemArticle = articlesData[i];
				idArticle = itemArticle._id;
				if (idArticle == idHistory){
					idCatInArt 	= itemArticle.category;
					//titleArt 	= itemArticle.title;
					titleArt 	= "<div onmousemove=myMoveItem('"+idArticle+"') onmouseout=myMoveItem2('"+idArticle+"') id="+idArticle+">"+ itemArticle.title+"</div>";
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
				    newArticles.push({ id: idArticle, group: idCatInArt, content: titleArt, start: startArt, className: style }); 
				}	
			}		
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

  var dataOnlyCategory = function(visDataSet, categoriesData, articlesData, categorySelected){

  var newCategories = [];
  var newArticles = [];
  var i, j, itemCategory, idCategory, nameCategory;
  var itemArticle, idArticle, idCatInArt, titleArt, startArt;

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
        //titleArt = itemArticle.title;
        titleArt 	= "<div onmousemove=myMoveItem('"+idArticle+"') onmouseout=myMoveItem2('"+idArticle+"') id="+idArticle+">"+ itemArticle.title+"</div>";
        startArt = new Date(itemArticle.created);
        newArticles.push({
          id: idArticle,
          group: idCatInArt,
          content: titleArt,
          start: startArt
        });
      }
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

  //Sort Up
  function sortUpMore(a,b) {
      if (a.value < b.value)
       return 1;
      if (a.value > b.value)
        return -1;
      return 0;
  }











