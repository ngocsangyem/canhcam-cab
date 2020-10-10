'use strict';

import path from 'path';
import del from 'del';
import imagemin from 'gulp-imagemin';

const {
	gulp,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);

// Run task

gulp.task('imagemin', () => {
	return (
		gulp
			.src(path.join(taskTarget, '**/.{gif,png,jpg,jpeg,bmp,svg}'))
			.pipe(
				imagemin(
					[
						imagemin.gifsicle({ interlaced: true }),
						imagemin.jpegtran({ progressive: true }),
						imagemin.optipng({ optimizationLevel: 7 }),
						imagemin.svgo({ plugins: [{ removeViewBox: true }] }),
					],
					{
						verbose: true,
					}
				)
			)
			// .pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest))
	);
});
