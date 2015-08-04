'use strict';

angular.module('activities').controller('ActivitiesPushUpdateController', ['$scope','Activities', 'Notify',
	function($scope, Activities, Notify) {
		
		$scope.Math = window.Math;
		
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