'use strict';

import path from 'path';
import clean from 'gulp-clean';

const {
	gulp,
	plugins,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget, url.styles.assets);

// Run task
gulp.task('cleanup', () => {
	return ([path.join(taskTarget, url.cleanup)], {
		read: false,
	})
		.pipe(
			clean({
				force: true,
			})
		)
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest));
});

gulp.task('cleanup-css', () => {
	return gulp.src(
		[
			path.join(taskTarget, url.styles.assets, 'pages', '*.*'),
			'!' +
				path.join(taskTarget, url.styles.assets, 'pages', '*.min.css'),
		],
		{
			read: false,
		}
	)
		.pipe(
			clean({
				force: true,
			})
		)
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest));
});

gulp.task('cleanup-js', () => {
	return gulp.src(
		[
			path.join(taskTarget, url.scripts.assets, 'pages', '*.*'),
			'!' +
				path.join(taskTarget, url.scripts.assets, 'pages', '*.min.js'),
		],
		{
			read: false,
		}
	)
		.pipe(
			clean({
				force: true,
			})
		)
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest));
});
