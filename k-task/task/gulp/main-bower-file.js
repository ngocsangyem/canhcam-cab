'use strict';

import path from 'path';
import mainBowerFiles from 'gulp-main-bower-files';

const {
	gulp,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget, url.fonts);

// Run task
gulp.task('main-bower-files', () => {
	return gulp
		.src('./bower.json')
		.pipe(mainBowerFiles())
		.pipe(gulp.dest(dest));
});
