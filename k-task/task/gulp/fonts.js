'use strict';

import path from 'path';

const {
	gulp,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget, url.fonts);

// Run task
gulp.task('fonts', () => {
	return gulp
		.src(
			require('main-bower-files')(
				'**/*.{eot,svg,ttf,woff,woff2}',
				function (err) {}
			).concat(path.join(url.source, url.fonts, '**/*'))
		)
		.pipe(gulp.dest(dest));
});
