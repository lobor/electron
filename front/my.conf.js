// Karma configuration
// Generated on Thu Jul 02 2015 09:58:17 GMT+0200 (CEST)


module.exports = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine', 'requirejs'],


		// list of files / patterns to load in the browser
		files: [
			'node_modules/angular/angular.js',
			// 'bower_components/angular-route/angular-route.js',
			// 'bower_components/angular-ui-router/release/angular-ui-router.js',
			'bower_components/angular-mocks/angular-mocks.js',
			//
			// 'bower_components/angular-cookies/angular-cookies.js',
			// 'bower_components/angular-loading-bar/build/loading-bar.js',
			// 'bower_components/ag-grid/dist/angularGrid.min.js',
			// // 'bower_components/angular-sanitize/angular-sanitize.min.js',
			// 'bower_components/jquery/dist/jquery.min.js',
			// 'bower_components/ng-notify/dist/ng-notify.min.js',
			// 'bower_components/cr-acl/cr-acl.js',
			// 'bower_components/angular-strap/dist/angular-strap.min.js',
			// 'bower_components/angular-strap/dist/angular-strap.tpl.min.js',
			// 'bower_components/angular-animate/angular-animate.min.js',
			// 'bower_components/angular-aria/angular-aria.min.js',
			// 'bower_components/angular-material/angular-material.min.js',
			// // 'bower_components/ng-flow/dist/ng-flow-standalone.js',
			// 'bower_components/ng-file-upload/dist/ng-file-upload-shim.min.js',
			// 'bower_components/ng-file-upload/dist/ng-file-upload.min.js',
			// 'bower_components/imgLiquid/js/imgLiquid-min.js',
			// 'bower_components/angular-jwt/dist/angular-jwt.min.js',
			// 'bower_components/angular-multi-step-form/dist/angular-multi-step-form.min.js',
			// 'bower_components/angular-form-for/dist/form-for.js',
			// 'bower_components/angular-form-for/dist/form-for.material-templates.js',

			{
				pattern: 'bower_components/**/*.js',
				included: false,
			}, {
				pattern: 'config/*.js',
				included: false,
			}, {
				pattern: 'controller/**/*.js',
				included: false,
			}, {
				pattern: 'controller/**/*.json',
				included: false,
			}, {
				pattern: 'controller/**/*.html',
				included: false,
			}, {
				pattern: 'decoratorForm/formFor/material/file-field.js',
				included: false,
			}, {
				pattern: 'decoratorForm/formFor/material/templates/file-field.html',
				included: false,
			}, {
				pattern: 'controller/**/*Spec.js',
				included: false,
			}, {
				pattern: 'app.js',
				included: false,
			}, {
				pattern: 'require-config.js',
				included: true
			}
		],

		client: {
			requireJsShowNoTimestampsError: false
		},
		// list of files to exclude
		exclude: [],

		plugins: [
			'karma-jasmine',
			'karma-requirejs',
			'karma-phantomjs-launcher',
			'karma-chrome-launcher',
			'karma-html-reporter',
		],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'html'],

		htmlReporter: {
			outputDir: './', // where to put the reports
			templatePath: null, // set if you moved jasmine_template.html
			focusOnFailures: true, // reports show failures on start
			namedFiles: 'context.html', // name files instead of creating sub-directories
			pageTitle: null, // page title for reports; browser info by default
			urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
			reportName: 'context', // report summary filename; browser info by default

			// experimental
			preserveDescribeNesting: false, // folded suites stay folded
			foldAll: false, // reports start folded (only with preserveDescribeNesting)
		},


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false
	})
}
