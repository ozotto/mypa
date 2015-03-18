'use strict';

angular.module('clientApp')
  .service('categorieResource', function($resource){
  	return $resource('/api/categories/:id',
  		    { id: '@id' }, //parameters default
              {
                query: { 
                    method: 'GET', 
                    //params: {},
                    format: 'json',
                    isArray: true
                },
                post: { method: 'POST', params: {} },
                delete: {method: 'DELETE' },
                getArticles :{
                  url : '/api/categories/:id/articles',
                  method : 'GET',
                  format: 'json',
                  isArray : true
                }
                //delete: { method: "POST", params: { content: "", order: 0, done: false } },
                //update: { method: "PATCH", params: { /*...*/ } },
          });
  });
