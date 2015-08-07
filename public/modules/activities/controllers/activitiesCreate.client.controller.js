'use strict';

angular.module('activities').controller('ActivitiesCreateController', ['$scope', 'Activities', 'Notify',
	function($scope, Activities, Notify ) {
		
		var colors = new Array('#88CC88','#FFFFFF','#66CCDD','#FFAA99','#AAFFEE',
			'#CFDCFD','#FFBB55','#004455','#66AACC','#AACCEE','#9A9A9A','#00CC99','#00ABCD');
		
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
				
				Notify.sendMsg('ActivityCountChange',response);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);