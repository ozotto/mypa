'use strict';

angular.module('clientApp')
  .service('historicResource', function($resource){
  	return $resource('/api/historic/:id',
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
