'use strict';

angular.module('activities').controller('ActivitiesPushController', ['$scope', 'Activities', 'Notify',
	function($scope, Activities, Notify ) {
		
		/* Date Picker */
		  $scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
		
			$scope.opened = true;
		  };
		  
			$scope.Date = function(){
			   return new Date();
			};
		
		  $scope.dateOptions = {
		    formatYear: 'yy',
		    startingDay: 1
		  };
		
		  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		  $scope.format = $scope.formats[0];
		
		  var tomorrow = new Date();
		  tomorrow.setDate(tomorrow.getDate() + 1);
		  var afterTomorrow = new Date();
		  afterTomorrow.setDate(tomorrow.getDate() + 2);
		  $scope.events =
			[
		  	{
		        date: tomorrow,
		    	status: 'full'
		  	},
		  	{
		        date: afterTomorrow,
		    	status: 'partially'
		  	}
			];		
		
		// Push Entry to Activity
		this.push = function(pushActivity) {
			var activity = pushActivity;
			activity.entries.push({
				entryText: this.entryText,
				entryDatePicker: this.entryDatePicker,
				entryDuration: ( this.entryHours * 60 * 60 ) + ( this.entryMinutes * 60 ) + this.entrySeconds,
				entryDescription: this.entryDescription
			});
			
			activity.$update(function() {
			
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);