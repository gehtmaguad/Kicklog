'use strict';

// Activities controller

var activityApp = angular.module('activities');

activityApp.controller('ActivitiesController', ['$scope', '$stateParams', 'Authentication', 'Activities', '$modal', '$log',
	function($scope, $stateParams, Authentication, Activities, $modal, $log) {
		
		this.authentication = Authentication;
		
		// Find a list of Activities
		this.activities = Activities.query();
		
		// Open a modal window to Update a Activity Record
		this.modalUpdate = function (size, selectedActivity) {

	    var modalInstance = $modal.open({
	      templateUrl: 'modules/activities/views/edit-activity.client.view.html',
	      controller: function ($scope, $modalInstance, activity) {
	      	$scope.activity = activity;
	      	
				  $scope.ok = function () {
				  	
				  	// BUGFIX: Not working, Modal can not be closed when ok
				  	// if (updateActivityForm.$valid) {
				    // 	$modalInstance.close($scope.activity);
				  	// }
				  	$modalInstance.close($scope.activity);
				  	
				  };
				
				  $scope.cancel = function () {
				    $modalInstance.dismiss('cancel');
				  };	      	
	      },
	      size: size,
	      resolve: {
	        activity: function () {
	          return selectedActivity;
	        }
	      }
	    });
	
	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	  };

	}
]);

activityApp.controller('ActivitiesCreateController', ['$scope', 'Activities',
	function($scope, Activities) {
		
	}
]);

activityApp.controller('ActivitiesUpdateController', ['$scope','Activities',
	function($scope, Activities) {
		
		// Update existing Activity
		this.update = function(updatedActivity) {
			var activity = updatedActivity;

			activity.$update(function() {

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		
	}
]);

activityApp.directive('activityList', [function() {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/activities/views/activity-list-template.html',
		link: function(scope, element, attrs) {
			
		}
	};
}]);


		// // Create new Activity
		// $scope.create = function() {
		// 	// Create new Activity object
		// 	var activity = new Activities ({
		// 		name: this.name,
		// 		description: this.description,
		// 		active: this.active
		// 	});

		// 	// Redirect after save
		// 	activity.$save(function(response) {
		// 		$location.path('activities/' + response._id);

		// 		// Clear form fields
		// 		$scope.name = '';
		// 		$scope.description = '';
		// 		$scope.active = '';
		// 	}, function(errorResponse) {
		// 		$scope.error = errorResponse.data.message;
		// 	});
		// };

		// // Remove existing Activity
		// $scope.remove = function(activity) {
		// 	if ( activity ) { 
		// 		activity.$remove();

		// 		for (var i in $scope.activities) {
		// 			if ($scope.activities [i] === activity) {
		// 				$scope.activities.splice(i, 1);
		// 			}
		// 		}
		// 	} else {
		// 		$scope.activity.$remove(function() {
		// 			$location.path('activities');
		// 		});
		// 	}
		// };





		// // Find existing Activity
		// $scope.findOne = function() {
		// 	$scope.activity = Activities.get({ 
		// 		activityId: $stateParams.activityId
		// 	});
		// };
