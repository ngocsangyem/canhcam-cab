'use strict';

import path from 'path';
import header from 'gulp-header';

const {
	gulp,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);
let banner = [
	'/*',
	' ////////////////////////////////////////////////////////',
	' // <%= url.name %>',
	' // @version v<%= url.version %>',
	' // @link <%= url.author.link %>',
	' // @license <%= url.license %>',
	' // @<%= url.author.coding %> - <%= url.author.phone %>',
	' // @<%= url.author.email %>',
	' ////////////////////////////////////////////////////////',
	'*/',
].join('\n');

// Run task
gulp.task('header', () => {
	return gulp
		.src(path.join(taskTarget, '**/*.{css,js}'))
		.pipe(
			header(banner, {
				url: url,
			})
		)
		.pipe(gulp.dest(dest));
});
