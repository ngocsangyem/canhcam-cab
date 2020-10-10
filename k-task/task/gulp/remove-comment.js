'use strict';

import path from 'path';
import gulpif from 'gulp-if';
import stripCssComments from 'gulp-strip-css-comments';
import stripJsComments from 'gulp-strip-comments';

const { gulp, config, taskTarget } = require('../utils');

let url = config;
let dest = path.join(taskTarget);

// Run task

gulp.task('remove-comment-css', () => {
	return (
		gulp
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
			.pipe(stripCssComments())
			// .pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest))
	);
});
gulp.task('remove-comment-js', () => {
	return (
		gulp
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
			.pipe(stripJsComments())
			// .pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest))
	);
});
