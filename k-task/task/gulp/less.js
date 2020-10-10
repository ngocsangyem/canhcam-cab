'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import gulpif from 'gulp-if';

const {
	gulp,
	plugins,
	config,
	taskTarget,
	browserSync,
	reportError,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget, url.styles.assets);

// Run task
gulp.task('less', () => {
	var autoprefixerOpts = {
		cascade: false,
	};
	return gulp
		.src([
			path.join(url.source, url.styles.less, '**/*.less'),
			'!' + path.join(url.source, '{**/_*,**/_*/**}'),
			'!' + path.join(url.source, url.styles.less, url.ignore.less),
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError,
			})
		)
		.pipe(plugins.sourcemaps.init())
		.pipe(
			plugins.less({
				style: 'expanded',
			})
		)
		.on('error', function (err) {
			plugins.util.log(err);
		})
		.pipe(plugins.postcss([autoprefixer(autoprefixerOpts)]))
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest(dest))
		.pipe(
			browserSync.stream({
				match: '**/*.css',
			})
		);
});
