'use strict';

angular.module('activities').directive('activityList', ['Activities', 'Notify', function(Activities,Notify) {
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
}
]);