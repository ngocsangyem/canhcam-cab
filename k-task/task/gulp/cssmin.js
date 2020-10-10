'use strict';

import path from 'path';
import minifyCss from 'gulp-csso';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';

const {
	gulp,
	plugins,
	args,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);

// Run task

gulp.task('cssmin', () => {
	return (
		gulp
			.src(path.join(taskTarget, '**/*.css'))
			.pipe(gulpif(!args.production, plugins.sourcemaps.init()))
			.pipe(minifyCss())
			.pipe(
				rename({
					suffix: '.min',
				})
			)
			.pipe(gulpif(!args.production, plugins.sourcemaps.write('./')))
			// .pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest))
	);
});
