'use strict';

import path from 'path';

const { gulp, plugins, args, config, taskTarget } = require('../utils');

let url = config;
let dest = path.join(taskTarget);
let destimg = path.join(taskTarget, 'img');
let destfonts = path.join(taskTarget, 'fonts');
let destwebfonts = path.join(taskTarget, 'webfonts');
let destcss = path.join(taskTarget, 'css');
let destfiles = path.join(taskTarget, 'files');

gulp.task('copy-img', () => {
	return gulp
		.src([path.join(url.source, 'img', '**/*')])
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destimg));
});
gulp.task('copy-files', () => {
	return gulp
		.src([path.join(url.source, 'files', '**/*')])
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destfiles));
});
gulp.task('copy-webfonts', () => {
	return gulp
		.src([path.join(url.source, 'webfonts', '**/*')])
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destwebfonts));
});
gulp.task('copy-fonts', () => {
	return gulp
		.src([path.join(url.source, 'fonts', '**/*')])
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destfonts));
});
gulp.task('copy-css', () => {
	return gulp
		.src([path.join(url.source, 'css', '**/*')])
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destcss));
});

// Run task
gulp.task('copy-build', () => {
	return gulp
		.src([
			path.join(url.source, '**/*'),
			path.join(url.source, '.htaccess'),
			'!' + path.join(url.source, '{**/_*,**/_*/**}'),
			'!' + path.join(url.source, url.scripts.root),
			'!' + path.join(url.source, url.styles.root),
			'!' + path.join(url.source, url.layouts.root),
			'!' + path.join(url.source, url.scripts.root, '**/*'),
			'!' + path.join(url.source, url.styles.root, '**/*'),
			'!' + path.join(url.source, url.layouts.root, '**/*'),
			'!' + path.join(url.source, url.ignore.copy),
		])
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest));
});

gulp.task(
	'copy',
	args.production
		? gulp.series('copy-build')
		: gulp.series(
				'copy-img',
				'copy-files',
				'copy-fonts',
				'copy-webfonts',
				'copy-css'
		  )
);
