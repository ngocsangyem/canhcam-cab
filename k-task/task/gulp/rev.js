'use strict';

import path from 'path';
import rev from 'gulp-rev';

const {
	gulp,
	plugins,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);

// Run task
gulp.task('rev', () => {
	return gulp
		.src([
			path.join(taskTarget, '**/*.{css,js}'),
			'!' + path.join(taskTarget, url.styles.assets, url.ignore.inject),
			'!' + path.join(taskTarget, url.scripts.assets, url.ignore.inject),
		])
		.pipe(rev())
		.pipe(gulp.dest(dest))
		.pipe(rev.manifest())
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest));
});
