'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';

const {
	gulp,
	plugins,
	args,
	config,
	taskTarget,
	browserSync,
	reportError,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget, url.styles.assets);

let fstm = require('fs');
let arraySass = [];
let arraySassList = [];

for (var key in url.SETUP) {
	if (url.SETUP.hasOwnProperty(key)) {
		for (var u in url.SETUP[key]) {
			if (url.SETUP[key].hasOwnProperty(u)) {
				for (var v in url.SETUP[key][u]) {
					if (arraySass.indexOf(url.SETUP[key][u][v]) === -1) {
						arraySass.push(url.SETUP[key][u][v]);
					}
				}
			}
		}
	}
}

arraySassList.push(
	'!' +
		path.join(
			url.source,
			url.styles.sass,
			url.concat.ACTIVE_CONCAT
				? url.ignore.sassactiveconcat
				: url.ignore.sass
		)
);
arraySassList.push(path.join(url.source, url.styles.sass, '**/*.{sass,scss}'));
arraySassList.push(url.src2 + '/_core/index.sass');
for (var i = 0; i < arraySass.length; i++) {
	arraySassList.push(url.src2 + '/' + arraySass[i] + '/index.sass');
}
arraySassList.push('!' + path.join(url.source, '{**/_*,**/_*/**}'));

// Run task
gulp.task('sass', () => {
	var autoprefixerOpts = {
		cascade: false,
	};

	return gulp
		.src(arraySassList)
		.pipe(
			plugins.plumber({
				errorHandler: reportError,
			})
		)
		.pipe(
			plugins
				.sass({
					outputStyle: 'expanded',
					precision: 10,
					includePaths: [
						// 'node_modules/ionic-angular/',
						// 'node_modules/ionicons/dist/scss',
						path.join(url.source, url.styles.sass),
					],
				})
				.on('error', function (err) {
					plugins.util.log(err);
				})
		)
		.pipe(concat('main.css'))
		.pipe(plugins.postcss([autoprefixer(autoprefixerOpts)]))
		.pipe(gulpif(!args.production, plugins.sourcemaps.init()))
		.pipe(gulpif(!args.production, plugins.sourcemaps.write('./')))
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest))
		.pipe(
			browserSync.stream({
				match: '**/*.css',
			})
		);
});
