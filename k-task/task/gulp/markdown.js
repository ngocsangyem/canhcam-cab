'use strict';

import path from 'path';
import markdown from 'gulp-markdown';

const {
	gulp,
	plugins,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);

// Run task
gulp.task('markdown', () => {
	return gulp
		.src([path.join(url.source, '**/*.md')])
		.pipe(markdown())
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest));
});
