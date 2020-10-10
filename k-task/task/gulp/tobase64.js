'use strict';

import path from 'path';
import cssBase64 from 'gulp-css-base64';

const {
	gulp,
	plugins,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);

// Run task
gulp.task('tobase64', () => {
	return gulp
		.src(path.join(taskTarget, '**/*.css'))
		.pipe(
			cssBase64({
				baseDir: '../' + url.images,
				maxWeightResource: 100,
				extensionsAllowed: ['.gif', '.jpg', '.png'],
			})
		)
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest));
});
