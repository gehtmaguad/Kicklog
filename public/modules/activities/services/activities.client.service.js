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
			this.msg = msg;
			this.data = data || {};
			$rootScope.$broadcast(this.msg);
		};
		
		return notify;

	}
])
;