'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		
		// Carousel
		$scope.myInterval = 5000;
	  var slides = $scope.slides = [];
	  
	    slides.push({
	      image: './modules/core/img/brand/carousel_activities.png',
	      text: 'create activities'
	    });	  

	    slides.push({
	      image: './modules/core/img/brand/carousel_entries.png',
	      text: 'keep track'
	    });	  
	    
	    slides.push({
	      image: './modules/core/img/brand/carousel_heatmap.png',
	      text: 'check status'
	    });	  
	    
	    slides.push({
	      image: './modules/core/img/brand/carousel_barchart.png',
	      text: 'show duration'
	    });	  	    

	}
]);