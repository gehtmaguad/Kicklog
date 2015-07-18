'use strict';

angular.module('activities').controller('ActivitiesCreateController', ['$scope', 'Activities', 'Notify',
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