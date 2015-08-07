<<<<<<< HEAD
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
||||||| merged common ancestors
=======
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
>>>>>>> 8f80e385d4338675fcbad8cff3ea692464eb2672
