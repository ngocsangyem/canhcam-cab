'use strict';

import path from 'path';
import minifyHtml from 'gulp-htmlmin';
import replace from 'gulp-replace';

const {
	gulp,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);

// Run task

gulp.task('htmlmin', () => {
	return (
		gulp
			.src(path.join(taskTarget, '**/*.html'))
			.pipe(minifyHtml({ collapseWhitespace: true }))
			.pipe(replace('</html></html>', '</html>'))
			// .pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest))
	);
});
