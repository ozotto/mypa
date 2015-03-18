'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('controllerCategory', function ($scope, categorieResource) {

  $scope.categories = categorieResource.query();

  $scope.createCategory = function(form){
    
    if(form.$valid){
      categorieResource.post( { name: $scope.fileName } );
      
      $scope.msgSuccess = "The category "+$scope.fileName+" was registered successfully";
      $scope.categories = categorieResource.query();
      $scope.fileName = "";
      $scope.success = true;
      
    }else{
      $scope.success = false;
    }
  }
/*
  	//$scope.newCategory
  	$scope.addCategory = function(){
  		categorieResource.post( { name: $scope.newCategory } );
  		$scope.categories = categorieResource.query();
  	};

  	$scope.deleteCategory = function(id){
  		categorieResource.delete( { id : id } );
  		$scope.categories = categorieResource.query();
  	}
*/
  });
