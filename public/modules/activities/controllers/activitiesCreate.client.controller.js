'use strict';

angular.module('activities').controller('ActivitiesCreateController', ['$scope', 'Activities', 'Notify',
	function($scope, Activities, Notify ) {
		
		var colors = new Array('#81C784','#FFFFFF','#64B5F6','#FFAB91','#A7FFEB',
			'#CFD8DC','#FFB74D','#004159','#65A8C4','#AACEE2','#9A93EC','#00C590','#00ADCE');
		
		// Create new Activity
		this.create = function() {
			// Create new Activity object
			var activity = new Activities ({
				name: this.name,
				description: this.description,
				color: colors[Math.floor(Math.random()*colors.length)]
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