'use strict';

import path from 'path';

const {
	gulp,
	plugins,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);
let destjs = path.join(taskTarget, url.scripts.assets);

// Run task
gulp.task('coffee', () => {
	return gulp
		.src([path.join(url.source, url.scripts.coffee, '**/*.coffee')])
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.coffee())
		.on('error', function (err) {
			plugins.util.log(err);
		})
		.on('error', plugins.notify.onError(config.defaultNo))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destjs));
});
