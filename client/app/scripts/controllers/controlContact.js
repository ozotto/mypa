'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('controlContact', function ($scope, $modal, $log, $location, categorieResource, articleResource) {
	
  $scope.show = function(){
    $scope.hello = "category"
  };

  $scope.hello = "show";

  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/300',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }

  /*
  $scope.rate = 7;
  $scope.max = 10;
  $scope.isReadonly = true;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.makeRate = function(value){

    alert($scope.rate);
  }

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
*/
  /*$scope.dynamicTooltip = 'Hello, World!';
  	$scope.dynamicTooltipText = 'dynamic';
  	$scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
  	$scope.hmlExample = '<img src="images/articles/NoPhoto.jpg" width="50" height="50" /><p style="text-align:left;"><strong>Soufflé chocolate cake powder.</strong> Applicake lollipop oat cake gingerbread.</p>';
  	$scope.dynamicPopover = 'Hello, World!';
  $scope.dynamicPopoverTitle = 'Title';

  $scope.funcionTest = testFunction();

	$scope.items = ['item1', 'item2', 'item3'];

  	$scope.open = function (size) {

	    var modalInstance = $modal.open({
	      templateUrl: 'myModalContent.html',
	      controller: 'ModalInstanceCtrl',
	      size: size,
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
  };
  */
  
});





