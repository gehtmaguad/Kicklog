'use strict';
var credentials = require('./credentials.js');

module.exports = {
	app: {
		title: 'kicklog',
		description: 'Simple Activity Tracking Tool',
		keywords: 'Activities, Goals, Tracking, Monitoring'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: credentials.sessionSecret,
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/nvd3/nv.d3.css',
				'public/lib/cal-heatmap/cal-heatmap.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/d3/d3.js',
				'public/lib/nvd3/nv.d3.js',
				'public/lib/angular-nvd3/dist/angular-nvd3.js',
				'public/lib/cal-heatmap/cal-heatmap.js',
				'public/lib/angular-cal-heatmap-directive-async/app/scripts/calHeatmap.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};