'use strict';

angular.module('activities').controller('ActivitiesUpdateController', ['$scope','Activities', 'Notify',
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
					Notify.sendMsg('ActivityCountChange', {'id': response._id});
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