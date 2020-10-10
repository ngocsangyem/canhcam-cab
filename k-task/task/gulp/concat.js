'use strict';

import path from 'path';
import concat from 'gulp-concat';
import concatCss from 'gulp-concat-css';

const { gulp, plugins, config, taskTarget } = require('../utils');

let url = config;
let dest = path.join(taskTarget);
let destjs = path.join(taskTarget, url.scripts.assets);
let destcss = path.join(taskTarget, url.styles.assets);

// Run task

gulp.task('concatJsCore', () => {
	return gulp
		.src(url.concat.js_core)
		.pipe(concat(url.concat.namejs_core + '.js'))
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destjs));
});
gulp.task('concatCSSCore', () => {
	return gulp
		.src(url.concat.css_core)
		.pipe(
			concatCss(url.concat.namecss_core + '.css', {
				includePaths: '',
				rebaseUrls: false,
				inlineImports: false,
			})
		)
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destcss));
});

gulp.task('concatjs', () => {
	return gulp
		.src(url.concat.js)
		.pipe(concat(url.concat.namejs + '.js'))
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destjs));
});

gulp.task('concatcss', () => {
	return gulp
		.src(url.concat.css)
		.pipe(
			concatCss(url.concat.namecss + '.css', {
				includePaths: '',
				rebaseUrls: false,
				inlineImports: false,
			})
		)
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destcss));
});

gulp.task(
	'concat',
	gulp.parallel(['concatJsCore', 'concatCSSCore', 'concatjs', 'concatcss'])
);
