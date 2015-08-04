'use strict';

//Activities service used to communicate Activities REST endpoints

angular.module('activities')

.factory('Activities', ['$resource',
	function($resource) {
		return $resource('activities/:activityId', { activityId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])

.factory('Notify', ['$rootScope',
	function($rootScope) {
		
		var notify = {};
		
		notify.sendMsg = function(msg, data) {
			data = data || {};
			$rootScope.$emit(msg, data);
			
			console.log('message sent!');
		};
		
		notify.getMsg = function(msg, func, scope) {
			var unbind = $rootScope.$on(msg, func);
			
			if (scope) {
				scope.$on('destroy', unbind);
			}
		};
		
		return notify;

	}
])
;