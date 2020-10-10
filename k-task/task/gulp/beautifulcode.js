'use strict';

import path from 'path';
import cssbeautify from 'gulp-cssbeautify';
import beautify from 'gulp-beautify';

const {
	gulp,
	plugins,
	config,
	taskTarget,
	reportError,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);

// Run task

gulp.task('beautiful-css', () => {
	return gulp
		.src([
			path.join(taskTarget, '**/*.css'),
			'!' +
				path.join(
					taskTarget,
					url.styles.assets,
					url.concat.namecss_core + '-*.css'
				),
			'!' +
				path.join(
					taskTarget,
					url.styles.assets,
					url.concat.namecss + '-*.css'
				),
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError,
			})
		)
		.pipe(cssbeautify())
		.pipe(gulp.dest(dest));
});

gulp.task('beautiful-js', () => {
	return gulp
		.src([
			path.join(taskTarget, '**/*.js'),
			'!' +
				path.join(
					taskTarget,
					url.scripts.assets,
					url.concat.namejs_core + '-*.js'
				),
			'!' +
				path.join(
					taskTarget,
					url.scripts.assets,
					url.concat.namejs + '-*.js'
				),
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError,
			})
		)
		.pipe(beautify({ indent_size: 2 }))
		.pipe(gulp.dest(dest));
});
