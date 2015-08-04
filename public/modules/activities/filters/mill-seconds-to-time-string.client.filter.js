'use strict';

angular.module('activities').filter('millSecondsToTimeString', [
	function() {
		return function(millseconds) {
	    var initseconds = Math.floor(millseconds / 1000);
	    var days = Math.floor(initseconds / 86400);
	    var hours = Math.floor((initseconds % 86400) / 3600);
	    var minutes = Math.floor(((initseconds % 86400) % 3600) / 60);
	    var seconds = Math.floor(((initseconds % 86400) % 3600) % 60);
	    var timeString = '';
	    if(days > 0) timeString += (days > 1) ? (days + ' days ') : (days + ' day ');
	    if(hours > 0) timeString += (hours > 1) ? (hours + ' hours ') : (hours + ' hour ');
	    if(minutes >= 0) timeString += (minutes > 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
	    if(seconds >= 0) timeString += (seconds > 1) ? (seconds + ' seconds ') : (seconds + ' second ');
	    return timeString;
		};
	}
]);