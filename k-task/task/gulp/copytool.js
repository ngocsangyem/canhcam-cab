'use strict';

import path from 'path';

const {
	gulp,
	plugins,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join('CAB-DAB/templates');
let destjs = path.join(taskTarget, url.scripts.assets);

// Run task
gulp.task('copytool', function () {
	return gulp.src([path.join(url.tmp, '**/*')])
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest));
});
