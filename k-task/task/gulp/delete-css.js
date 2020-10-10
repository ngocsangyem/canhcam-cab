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

gulp.task('delete-css', () => {
	return gulp
		.src(
			[
				path.join(taskTarget, url.styles.assets, '*.*'),
				'!' + path.join(taskTarget, url.styles.assets, '*-*.min.css'),
				path.join(taskTarget, url.styles.assets, '**/*.*'),
				'!' +
					path.join(taskTarget, url.styles.assets, '**/*-*.min.css'),
				'!' +
					path.join(taskTarget, url.styles.assets, url.ignore.inject),
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
