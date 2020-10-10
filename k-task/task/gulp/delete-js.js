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
let dest = path.join(taskTarget, url.scripts.assets);

// Run task

gulp.task('delete-js', () => {
	return gulp
		.src(
			[
				path.join(taskTarget, url.scripts.assets, '*.*'),
				'!' + path.join(taskTarget, url.scripts.assets, '*-*.min.js'),
				path.join(taskTarget, url.scripts.assets, '**/*.*'),
				'!' +
					path.join(taskTarget, url.scripts.assets, '**/*-*.min.js'),
				'!' +
					path.join(
						taskTarget,
						url.scripts.assets,
						url.ignore.inject
					),
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
