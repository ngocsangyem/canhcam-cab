'use strict';

import path from 'path';
import sitemap from 'gulp-sitemap';

const {
	gulp,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);

// Run task
gulp.task('sitemap', () => {
	return gulp
		.src(
			[
				path.join(taskTarget, '**/*.html'),
				'!' + path.join(taskTarget, '**/404.html'),
				'!' + path.join(taskTarget, '**/403.html'),
				'!' + path.join(taskTarget, '**/400.html'),
				'!' + path.join(taskTarget, '**/500.html'),
				'!' + path.join(taskTarget, '**/502.html'),
				'!' + path.join(taskTarget, '**/503.html'),
			],
			{
				read: false,
			}
		)
		.pipe(
			sitemap({
				siteUrl: '//' + config.SEO.cfg_url,
			})
		)
		.pipe(gulp.dest(dest));
});
