'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'merciless';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('activities');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('activities').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Activities', 'activities', 'dropdown', '/activities(/create)?');
		Menus.addSubMenuItem('topbar', 'activities', 'List Activities', 'activities');
		//Menus.addSubMenuItem('topbar', 'activities', 'New Activity', 'activities/create');
	}
]);
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
		});
	}
]);
'use strict';

// Activities controller

var activityApp = angular.module('activities');

activityApp.controller('ActivitiesController', ['$scope', '$stateParams', 'Authentication', 'Activities', '$modal', '$log',
	function($scope, $stateParams, Authentication, Activities, $modal, $log) {
		
		this.authentication = Authentication;
		
		// Find a list of Activities
		this.activities = Activities.query();
		
		// Open a modal window to Create a Activity Record
		this.modalCreate = function (size) {

	    var modalInstance = $modal.open({
	      templateUrl: 'modules/activities/views/create-activity.client.view.html',
	      controller: ["$scope", "$modalInstance", function ($scope, $modalInstance) {
	      	
				  $scope.ok = function () {
				  	
				  	// BUGFIX: Not working, Modal can not be closed when ok
				  	// if (createActivityForm.$valid) {
				    // 	$modalInstance.close();
				  	// }
				  	$modalInstance.close();
				  	
				  };
				
				  $scope.cancel = function () {
				    $modalInstance.dismiss('cancel');
				  };	      	
	      }],
	      size: size,
	    });
	
	    modalInstance.result.then(function (selectedItem) {
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	  };		
		
		// Open a modal window to Update a Activity Record
		this.modalUpdate = function (size, selectedActivity) {

	    var modalInstance = $modal.open({
	      templateUrl: 'modules/activities/views/edit-activity.client.view.html',
	      controller: ["$scope", "$modalInstance", "activity", function ($scope, $modalInstance, activity) {
	      	$scope.activity = activity;
	      	
				  $scope.ok = function () {
				  	
				  	// BUGFIX: Not working, Modal can not be closed when ok
				  	// if (updateActivityForm.$valid) {
				    // 	$modalInstance.close($scope.activity);
				  	// }
				  	$modalInstance.close($scope.activity);
				  	
				  };
				
				  $scope.cancel = function () {
				    $modalInstance.dismiss('cancel');
				  };	      	
	      }],
	      size: size,
	      resolve: {
	        activity: function () {
	          return selectedActivity;
	        }
	      }
	    });
	
	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	  };
	  
		// Open a modal window to Update a Activity Record
		this.modalPush = function (size, selectedActivity) {

	    var modalInstance = $modal.open({
	      templateUrl: 'modules/activities/views/create-activity-entry.client.view.html',
	      controller: ["$scope", "$modalInstance", "activity", function ($scope, $modalInstance, activity) {
	      	$scope.activity = activity;
	      	
				  $scope.ok = function () {
				  	
				  	// BUGFIX: Not working, Modal can not be closed when ok
				  	// if (updateActivityForm.$valid) {
				    // 	$modalInstance.close($scope.activity);
				  	// }
				  	$modalInstance.close($scope.activity);
				  	
				  };
				
				  $scope.cancel = function () {
				    $modalInstance.dismiss('cancel');
				  };	      	
	      }],
	      size: size,
	      resolve: {
	        activity: function () {
	          return selectedActivity;
	        }
	      }
	    });
	
	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	  };
	  
	  // Find existing Activity
		$scope.findOne = function() {
			$scope.activity = Activities.get({ 
				activityId: $stateParams.activityId
			});
		};

	}
]);

activityApp.controller('ActivitiesCreateController', ['$scope', 'Activities', 'Notify',
	function($scope, Activities, Notify ) {
		
		// Create new Activity
		this.create = function() {
			// Create new Activity object
			var activity = new Activities ({
				name: this.name,
				description: this.description,
				active: this.active
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

activityApp.controller('ActivitiesPushController', ['$scope', 'Activities', 'Notify',
	function($scope, Activities, Notify ) {
		
		// Push Entry to Activity
		this.push = function(pushActivity) {
			var activity = pushActivity;
			activity.entries.push({
				entryText: this.entryText
			});
			
			activity.$update(function() {
			
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

activityApp.controller('ActivitiesUpdateController', ['$scope','Activities', 'Notify',
	function($scope, Activities, Notify) {
		
		// Update existing Activity
		this.update = function(updatedActivity) {
			var activity = updatedActivity;

			activity.$update(function() {

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		
		// Remove existing Activity
		this.remove = function(deleteActivity) {
			var activity = deleteActivity;
			
			if ( activity ) { 
				activity.$remove(function(response){
					Notify.sendMsg('NewActivity', {'id': response._id});
				});

				for (var i in this.activities) {
					if (this.activities [i] === activity) {
						this.activities.splice(i, 1);
					}
				}
			} else {
				this.activity.$remove(function() {
				});
			}
		};		
		
	}
]);

activityApp.directive('activityList', ['Activities', 'Notify', function(Activities,Notify) {
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
}]);
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
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
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
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);