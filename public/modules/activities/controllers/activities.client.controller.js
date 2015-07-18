'use strict';

// Activities controller

var activityApp = angular.module('activities');

activityApp.filter('millSecondsToTimeString', function() {
  return function(millseconds) {
    var seconds = Math.floor(millseconds / 1000);
    var days = Math.floor(seconds / 86400);
    var hours = Math.floor((seconds % 86400) / 3600);
    var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var timeString = '';
    if(days > 0) timeString += (days > 1) ? (days + ' days ') : (days + ' day ');
    if(hours > 0) timeString += (hours > 1) ? (hours + ' hours ') : (hours + ' hour ');
    if(minutes >= 0) timeString += (minutes > 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
    return timeString;
};
});

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
	  
		// Open a modal window to Add an Activity Entry Record
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
	  
		// Open a modal window to Update an Activity Entry Record
		this.modalPushUpdate = function (size, selectedEntry, selectedActivity) {

	    var modalInstance = $modal.open({
	      templateUrl: 'modules/activities/views/edit-activity-entry.client.view.html',
	      controller: function ($scope, $modalInstance, entry, activity) {
	      	$scope.entry = entry;
	      	$scope.activity = activity;
	      	
				  $scope.ok = function () {
				  	
				  	// BUGFIX: Not working, Modal can not be closed when ok
				  	// if (updateActivityForm.$valid) {
				    // 	$modalInstance.close($scope.activity);
				  	// }
				  	$modalInstance.close($scope.entry);
				  	$modalInstance.close($scope.activity);
				  	
				  };
				
				  $scope.cancel = function () {
				    $modalInstance.dismiss('cancel');
				  };	      	
	      },
	      size: size,
	      resolve: {
	        entry: function () {
	          return selectedEntry;
	        },
	        activity: function() {
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
	  
	  // Heat Map Data Object
	  var heatMapMonthStartSmDevice = new Date();
	  heatMapMonthStartSmDevice.setMonth(heatMapMonthStartSmDevice.getMonth()-4);
	  $scope.heatMapMonthStartSmDevice = heatMapMonthStartSmDevice;
	  
	  var heatMapMonthStartXsDevice = new Date();
	  heatMapMonthStartXsDevice.setMonth(heatMapMonthStartXsDevice.getMonth()-2);
	  $scope.heatMapMonthStartXsDevice = heatMapMonthStartXsDevice;
	  
	  $scope.heatMapDataObject = {};

		// Bar Chart
		$scope.options = {
		  chart: {
		      type: 'discreteBarChart',
		      height: 450,
		      margin : {
		          top: 20,
		          right: 20,
		          bottom: 60,
		          left: 55
		      },
		      x: function(d){return d.label;},
		      y: function(d){return d.value;},
		      showValues: false,
		      showXAxis: false,
		      transitionDuration: 0,
		      xAxis: {
		          axisLabel: 'X Axis',
		          axisLabelDistance: 300
		      },
		      yAxis: {
		          axisLabel: 'Y Axis'
		      },
		      rotateLabels: 90
		  }
		};
		
		// Data Object for Bar Chart
    $scope.data = [
      {
        key: 'Cumulative Return',
        values: [ ]
      }
  	];

	  // Find existing Activity
		$scope.findOne = function() {
			$scope.activity = Activities.get({ 
				activityId: $stateParams.activityId
			});
			
			// Activity Data Object Callback Function
			$scope.activity.$promise.then(function(data) {
				for(var j in data.entries) {
					
					// Heat Map
					var timestamp = Date.parse(data.entries[j].entryDatePicker)/1000;
					$scope.heatMapDataObject[timestamp] = 1;
					
					// Bar Chart
					$scope.data[0].values.push({'label': data.entries[j].entryDatePicker,'value':data.entries[j].entryDuration });
				}				
			});			
		};
		
		// Helper Function to refresh chart in hidden directive
		$scope.refreshCharts = function () {
      for (var i = 0; i < nv.graphs.length; i++) {
    	  nv.graphs[i].update();
      }
    };		

		// Heat Map Data Summary Object 
		// currently not used
		// $scope.heatMapDataObjectSummary = {};
		// Activities.query(function(arr) {
		// 	var i;
		// 	for (i = 0; i < arr.length; i++) { 
		// 		for(var j in arr[i].entries) {
		// 			var timestamp = Date.parse(arr[i].entries[j].entryDatePicker)/1000;
		// 			$scope.heatMapDataObjectSummary[timestamp] = 1;
		// 		}
		// 	}
		// });
		
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
		
		/* Date Picker */
		  $scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
		
			$scope.opened = true;
		  };
		  
			$scope.Date = function(){
			   return new Date();
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
				entryText: this.entryText,
				entryDatePicker: this.entryDatePicker,
				entryDuration: ( this.entryHours * 60 * 60 ) + ( this.entryMinutes * 60 ) + this.entrySeconds,
				entryDescription: this.entryDescription
			});
			
			activity.$update(function() {
			
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

activityApp.controller('ActivitiesPushUpdateController', ['$scope','Activities', 'Notify',
	function($scope, Activities, Notify) {
		
		// Update Entry from Activity (Delete old one and create new one)
		this.update = function(pullEntry, pullActivity) {
			var entry = pullEntry;
			var activity = pullActivity;

			activity.entries = activity.entries.filter(function (el) { return el._id !== entry._id;});
			
			activity.entries.push({
				entryText: entry.entryText,
				entryDatePicker: entry.entryDatePicker,
				entryDuration: ( entry.entryHours * 60 * 60 ) + ( entry.entryMinutes * 60 ) + entry.entrySeconds,
				entryDescription: entry.entryDescription
			});			
			
			activity.$update(function() {
			
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};		
		
		// Pull Entry from Activity
		this.pull = function(pullEntry, pullActivity) {
			var entry = pullEntry;
			var activity = pullActivity;

			activity.entries = activity.entries.filter(function (el) { return el._id !== entry._id;});
			
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