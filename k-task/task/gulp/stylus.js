'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import gulpif from 'gulp-if';

const {
	gulp,
	plugins,
	args,
	config,
	taskTarget,
	browserSync,
	reportError,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget, url.styles.assets);

// Run task
gulp.task('stylus', () => {
	var autoprefixerOpts = {
		cascade: false,
	};

	return gulp
		.src([
			path.join(url.source, url.styles.stylus, '**/*.styl'),
			'!' + path.join(url.source, '{**/_*,**/_*/**}'),
			'!' + path.join(url.source, url.styles.stylus, url.ignore.stylus),
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError,
			})
		)
		.pipe(gulpif(!args.production, plugins.sourcemaps.init()))
		.pipe(
			plugins
				.stylus({
					compress: true,
					'include css': true,
				})
				.on('error', function (err) {
					plugins.util.log(err);
				})
		)
		.pipe(plugins.postcss([autoprefixer(autoprefixerOpts)]))
		.pipe(gulpif(!args.production, plugins.sourcemaps.write('./')))
		.pipe(gulp.dest(dest))
		.pipe(
			browserSync.stream({
				match: '**/*.css',
			})
		);
});
