'use strict';

// Activities controller

var activityApp = angular.module('activities');

activityApp.controller('ActivitiesController', ['$scope', '$stateParams', 'Authentication', 'Activities', '$modal', '$log',
	function($scope, $stateParams, Authentication, Activities, $modal, $log) {
		
		this.authentication = Authentication;
		
		// Find a list of Activities
		this.activities = Activities.query();
		
		// Open a modal window to Create a Activity Record
		this.modalCreate = function (size) {

	    var modalInstance = $modal.open({
	      templateUrl: 'modules/activities/views/create-activity.client.view.html',
	      controller: function ($scope, $modalInstance) {
	      	
				  $scope.ok = function () {
				  	
				  	// BUGFIX: Not working, Modal can not be closed when ok
				  	// if (createActivityForm.$valid) {
				    // 	$modalInstance.close();
				  	// }
				  	$modalInstance.close();
				  	
				  };
				
				  $scope.cancel = function () {
				    $modalInstance.dismiss('cancel');
				  };	      	
	      },
	      size: size,
	    });
	
	    modalInstance.result.then(function (selectedItem) {
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	  };		
		
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
	  
		// Open a modal window to Update a Activity Record
		this.modalPush = function (size, selectedActivity) {

	    var modalInstance = $modal.open({
	      templateUrl: 'modules/activities/views/create-activity-entry.client.view.html',
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
	  
	  // Find existing Activity
		$scope.findOne = function() {
			$scope.activity = Activities.get({ 
				activityId: $stateParams.activityId
			});
		};

	}
]);

activityApp.controller('ActivitiesCreateController', ['$scope', 'Activities', 'Notify',
	function($scope, Activities, Notify ) {
		
		// Create new Activity
		this.create = function() {
			// Create new Activity object
			var activity = new Activities ({
				name: this.name,
				description: this.description,
				active: this.active
			});

			// Redirect after save
			activity.$save(function(response) {
				
				Notify.sendMsg('NewActivity', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

activityApp.controller('ActivitiesPushController', ['$scope', 'Activities', 'Notify',
	function($scope, Activities, Notify ) {
		
  	$scope.open = function($event) {
    	$event.preventDefault();
    	$event.stopPropagation();

    	$scope.opened = true;
  	};

  	$scope.dateOptions = {
  	  formatYear: 'yy',
	    startingDay: 1
  	};

  	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];

  	var tomorrow = new Date();
  	tomorrow.setDate(tomorrow.getDate() + 1);
  	var afterTomorrow = new Date();
  	afterTomorrow.setDate(tomorrow.getDate() + 2);
  	$scope.events =
    	[
      	{
	        date: tomorrow,
        	status: 'full'
      	},
      	{
	        date: afterTomorrow,
        	status: 'partially'
      	}
    	];		
		
		// Push Entry to Activity
		this.push = function(pushActivity) {
			var activity = pushActivity;
			activity.entries.push({
				entryText: this.entryText
			});
			
			activity.$update(function() {
			
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

activityApp.controller('ActivitiesUpdateController', ['$scope','Activities', 'Notify',
	function($scope, Activities, Notify) {
		
		// Update existing Activity
		this.update = function(updatedActivity) {
			var activity = updatedActivity;

			activity.$update(function() {

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		
		// Remove existing Activity
		this.remove = function(deleteActivity) {
			var activity = deleteActivity;
			
			if ( activity ) { 
				activity.$remove(function(response){
					Notify.sendMsg('NewActivity', {'id': response._id});
				});

				for (var i in this.activities) {
					if (this.activities [i] === activity) {
						this.activities.splice(i, 1);
					}
				}
			} else {
				this.activity.$remove(function() {
				});
			}
		};		
		
	}
]);

activityApp.directive('activityList', ['Activities', 'Notify', function(Activities,Notify) {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/activities/views/activity-list-template.html',
		link: function(scope, element, attrs) {
			
			// when a new activity is added, update the activity list
			Notify.getMsg('NewActivity', function(event, data) {
				// Find a list of Activities
				scope.activitiesCtrl.activities = Activities.query();
			});
		}
	};
}]);