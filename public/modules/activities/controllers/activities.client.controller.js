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
				  	
				  	// BUG: Not working, Modal can not be closed when ok
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
				  	
			  	// BUG: Not working, Modal can not be closed when ok
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
				  	
				  	// BUG: Not working, Modal can not be closed when ok
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
				  	
				  	// BUG: Not working, Modal can not be closed when ok
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
		          axisLabel: 'entries',
		          axisLabelDistance: 500
		      },
		      yAxis: {
		          axisLabel: 'hours',
  						axisLabelDistance: 40
		      },
		      rotateLabels: 90
		  }
		};
		
		// Data Object for Bar Chart
		var dataTemp = {};
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
				
				data.entries.sort(function(a,b){
					return new Date(a.entryDatePicker) - new Date(b.entryDatePicker);
				});
				
				// Summary 
				var duration_summary = 0;
				var entry_summary = 0;
					
				for(var j in data.entries) {
					
					var timestamp = Date.parse(data.entries[j].entryDatePicker)/1000;
					var localtime = new Date(Date.parse(data.entries[j].entryDatePicker)).toLocaleDateString();
					var duration = data.entries[j].entryDuration / 60 / 60;
					
					duration_summary += data.entries[j].entryDuration;
					entry_summary += 1;
					
					// Heat Map

					if (timestamp in $scope.heatMapDataObject) {
						$scope.heatMapDataObject[timestamp] += 1;
					} else {
						$scope.heatMapDataObject[timestamp] = 1;
					}
					
					// Bar Chart
					if (localtime in dataTemp) {
						dataTemp[localtime] += duration;
					} else {
						dataTemp[localtime] = duration;
					}
				}
				
				
				// Bar Chart
				for (var label in dataTemp) {
				    $scope.data[0].values.push({'label': label, 'value': dataTemp[label] });
				}	
				
				// Duration Summary
				$scope.duration_summary = duration_summary;
				$scope.entry_summary = entry_summary;
				$scope.duration_average = duration_summary / entry_summary;
				
			});			
		};
		
	}
]);