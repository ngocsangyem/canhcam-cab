'use strict';

const {
	gulp,
	config,
	taskTarget,
	browserSync,
} = require('../utils');

gulp.task('browserSync', () => {
	browserSync.init({
		open:
			process.argv.slice(2) == 'server' ||
			process.argv.slice(2) == 'serve' ||
			process.argv.slice(2) == 'dev'
				? true
				: false,
		startPath: config.baseUrl,
		port: config.port || config.sameport,
		server: {
			baseDir: taskTarget,
			routes: (() => {
				let routes = {};

				// Map base URL to routes
				routes[config.baseUrl] = taskTarget;

				return routes;
			})(),
		},
	});
});
