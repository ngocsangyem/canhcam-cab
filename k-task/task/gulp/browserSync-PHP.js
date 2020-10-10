'use strict';

const {
	gulp,
	config,
	browserSync,
} = require('../utils');

gulp.task('php', () => {
	connect.server({
		base: taskTarget,
		port: config.proxy,
		keepalive: true,
	});
});

gulp.task('browserSyncPhp', gulp.series('php'), () => {
	browserSync.init({
		open: process.argv.slice(2) == 'server' ? true : false,
		proxy: config.host + ':' + config.proxy,
		startPath: config.baseUrl,
		port: config.port || config.sameport,
	});
});


