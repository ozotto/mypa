'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('articleNew', function ($scope, $http, $timeout, categorieResource, articleResource) {
  
  //Consult Categories
  categorieResource.query().$promise.then(
    function(categoriesData){
      $scope.categories  = categoriesData;
  });

  $scope.date = moment().format();

  $scope.createArticle = function(form){
    
    if(form.$valid){
      articleResource.post( { title: $scope.fileTitle,
                            content: $scope.fileContent,
                            category: $scope.fileCategory._id,
                            created: $scope.date
      });
      $scope.msgSuccess = "The article "+$scope.fileTitle+" was registered successfully";
      $scope.fileTitle = "";
      $scope.fileContent = "";
      $scope.fileCategory = "";
      $scope.success = true;
    }else{
      $scope.success = false;
    }
  }

});	