'use strict';

import path from 'path';
import csscomb from 'gulp-csscomb';

const {
	gulp,
	plugins,
	taskTarget,
} = require('../utils');

let dest = path.join(taskTarget);

// Run task
gulp.task('csscomb', () => {
	return gulp
		.src(path.join(target, '**/*.css'))
		.pipe(
			plugins.autoprefixer()
		)
		.pipe(csscomb())
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest));
});
