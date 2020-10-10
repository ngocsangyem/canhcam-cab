'use strict';

import path from 'path';
import gulpif from 'gulp-if';

const {
	gulp,
	plugins,
	config,
	taskTarget,
	browserSync,
} = require('../utils');

let url = config;

// Run task
gulp.task('eslint', () => {
	return gulp
		.src([
			path.join(url.source, url.scripts.javascript, '**/*.js'),
			// Ignore all vendor folder files
			'!' + path.join('gulpfile.babel.js'),
			'!' + path.join(url.source, url.ignore.test),
		])
		.pipe(
			browserSync.reload({
				stream: true,
				once: true,
			})
		)
		.pipe(
			plugins.eslint({
				useEslintrc: true,
			})
		)
		.pipe(plugins.eslint.format())
		.pipe(gulpif(!browserSync.active, plugins.eslint.failAfterError()))
		.on('error', function () {
			if (!browserSync.active) {
				process.exit(1);
			}
		});
});
