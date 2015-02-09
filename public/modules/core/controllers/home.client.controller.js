'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.alerts = [
			{
				icon: 'glyphicon-user',
				colour: 'btn-success',
				total: '124',
				description: 'TOTAL USERS'
			},
			{
				icon: 'glyphicon-flag',
				colour: 'btn-info',
				total: '345',
				description: 'TOTAL ACTIVITIES'
			},
			{
				icon: 'glyphicon-pencil',
				colour: 'btn-danger',
				total: '125334',
				description: 'TOTAL ENTRIES'
			},
			{
				icon: 'glyphicon-time',
				colour: 'btn-warning',
				total: '13465 hours',
				description: 'TOTAL TIME SPENT'
			}
		];


	}
]);
