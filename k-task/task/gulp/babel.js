'use strict';

import path from 'path';

const {
	gulp,
	plugins,
	config,
	taskTarget,
	reportError,
} = require('../utils');

let url = config;
let destjs = path.join(taskTarget, url.scripts.assets);
let dest = path.join(taskTarget);

// Run task
gulp.task('babel', () => {
	return gulp
		.src([
			'!' + path.join(url.source, url.ignore.scripts),
			'!' +
				path.join(
					url.source,
					url.scripts.javascript,
					url.concat.ACTIVE_CONCAT
						? url.ignore.concatactiveconcat
						: url.ignore.concat
				),
			path.join(url.source, url.scripts.javascript, '**/*.js'),
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError,
			})
		)
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.babel())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destjs));
});
