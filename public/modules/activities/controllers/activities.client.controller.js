'use strict';

// Activities controller

var activityApp = angular.module('activities');

angular.module('activities').controller('ActivitiesController', ['$scope', '$stateParams', 'Authentication', 'Activities', '$modal', '$log',
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
		
		// // Helper Function to refresh chart in hidden directive
		// $scope.refreshCharts = function () {
  //     for (var i = 0; i < nv.graphs.length; i++) {
  //   	  nv.graphs[i].update();
  //     }
  //   };		

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