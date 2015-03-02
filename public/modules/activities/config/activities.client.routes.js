'use strict';

//Setting up route
angular.module('activities').config(['$stateProvider',
	function($stateProvider) {
		// Activities state routing
		$stateProvider.
		state('listActivities', {
			url: '/activities',
			templateUrl: 'modules/activities/views/list-activities.client.view.html'
		}).
		state('viewActivity', {
			url: '/activities/:activityId',
			//templateUrl: 'modules/activities/views/view-activity.client.view.html'
			templateUrl: 'modules/activities/views/list-activity-entries.client.view.html'
		})
	}
]);