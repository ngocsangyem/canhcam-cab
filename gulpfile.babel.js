'use strict';

import path from 'path';
import gulp from 'gulp';
import glob from 'glob';

const { KarmaServer } = require('./k-task/task/utils');

// Load Gulp tasks folder
glob.sync('./k-task/task/gulp/**/*.js')
	.filter((file) => {
		return /\.(js)$/i.test(file);
	})
	.map(function (file) {
		require(file);
	});

// Basic production-ready code

gulp.task(
	'k-task',
	gulp.series(
		gulp.parallel([
			'sass', // css, less, stylus
			'babel',
			'pug', // hamber, ejs, pug
			'copy',
			'fonts',
		]),
		'concat',
		'babel-concat',
	)
);

gulp.task(
	'ser',
	gulp.series('k-task', 'inject', 'browserSync', 'watch')
);

// Basic production-ready code

gulp.task('k-dev', gulp.series('k-task', 'inject', 'browserSync', 'watch'));

gulp.task(
	'k-builder',
	gulp.series(
		'pug-copy-dev', // hamber, ejs, pug
		'sass-dev', // css, less, stylus
		'babel',
		'babel-concat-dev',
		'copy',
		'fonts',
		'pug-dev', // hamber, ejs, pug
		'pug-rename-dev',
		'concat',
		'map-dev',
		'concattool'
	)
);

// Testing
gulp.task('testing', (done) => {
	new KarmaServer(
		{
			configFile: path.join(__dirname, '/k-task/karma.conf.js'),
			singleRun: !setgulp.watch,
			autoWatch: setgulp.watch,
		},
		done
	).start();
});

// Default task
gulp.task('default', gulp.series('clean', 'k-task'));

gulp.task('test', gulp.series('clean', 'testing'));

gulp.task('serve', gulp.series('clean', 'ser'));

gulp.task('dev', gulp.series('clean', 'k-dev'));

gulp.task('builder', gulp.series('clean', 'k-builder'));

gulp.task('server', gulp.series('clean', 'ser'));
