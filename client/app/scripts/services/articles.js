'use strict';

angular.module('clientApp')
  .service('articleResource', function($resource){
  	return $resource('/api/articles/:id',
  		    { id: '@id' }, //parameters default
              {
                query: { 
                    method: 'GET', 
                    params: {},
                    format: 'json',
                    isArray:true
                },

                post: { method: 'POST', params: {} },
                delete: {method: 'DELETE' },
                get : { method : 'GET'}                            
                //delete: { method: "POST", params: { content: "", order: 0, done: false } },
                //update: { method: "PATCH", params: { /*...*/ } },
          });
  });
