'use strict';

angular.module('clientApp')
  .service('favoriteResource', function($resource){
  	return $resource('/api/favorites/:id',
  		    { id: '@id' }, 
              {
                query: { 
                    method: 'GET', 
                    params: {},
                    format: 'json',
                    isArray:true
                },
                post: { method: 'POST', params: {} }
          });
  });
