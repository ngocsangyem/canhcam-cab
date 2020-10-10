'use strict';
const {
	gulp,
	config,
	browserSync,
} = require('../utils');

gulp.task('browserSynctool', () => {
	browserSync.init({
		open: true,
		startPath: config.baseUrl,
		port: config.port || config.sameport,
		server: {
			baseDir: 'tmptool',
			routes: (() => {
				let routes = {};

				// Map base URL to routes
				routes[config.baseUrl] = 'tmptool';

				return routes;
			})(),
		},
	});
});
