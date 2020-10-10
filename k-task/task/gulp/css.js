'use strict';

import path from 'path';

const { gulp, plugins, config, taskTarget, browserSync } = require('../utils');

let url = config;
let dest = path.join(taskTarget, url.styles.assets);

// Run task
gulp.task('css', () => {
	return gulp
		.src([
			path.join(url.source, url.styles.css, '**/*.css'),
			'!' + path.join(url.source, '{**/_*,**/_*/**}'),
			'!' + path.join(url.source, url.styles.css, url.ignore.css),
		])
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest))
		.pipe(
			browserSync.stream({
				match: '**/*.css',
			})
		);
});
