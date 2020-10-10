'use strict';

import path from 'path';
import inject from 'gulp-inject';
import replace from 'gulp-replace';

const { gulp, config, taskTarget, browserSync } = require('../utils');

let url = config;
let dest = path.join(taskTarget);

// Run task
gulp.task('inject-dev', () => {
	var target2 = gulp.src(path.join(taskTarget, '**/*.html'));
	return target2
		.pipe(
			inject(
				gulp.src(
					[
						path.join(
							taskTarget,
							'**/*' + url.concat.namecss_core + '.css'
						),
						path.join(
							taskTarget,
							'**/*' + url.concat.namejs_core + '.js'
						),
						path.join(
							taskTarget,
							'**/*' + url.concat.namecss + '.css'
						),
						path.join(
							taskTarget,
							'**/*' + url.concat.namejs + '.js'
						),
						path.join(taskTarget, '**/*.css'),
						path.join(taskTarget, '**/*.js'),
						'!' +
							path.join(
								taskTarget,
								url.styles.assets,
								url.ignore.inject,
								'*.css'
							),
					],
					{
						read: false,
						ignorePath: '/' + taskTarget + '/',
						addRootSlash: true,
					}
				)
			)
		)
		.pipe(replace('/' + taskTarget + '/', './'))
		.pipe(gulp.dest(dest))
		.on('end', browserSync.reload);
});
