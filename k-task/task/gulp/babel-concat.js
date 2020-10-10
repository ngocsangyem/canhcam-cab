'use strict';

import path from 'path';
import concat from 'gulp-concat';

const {
	gulp,
	plugins,
	args,
	config,
	taskTarget,
	reportError,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);
let destjs = path.join(taskTarget, url.scripts.assets);

let arrayJS = [];
let arrayJSList = [];

for (var key in url.SETUP) {
	if (url.SETUP.hasOwnProperty(key)) {
		for (var u in url.SETUP[key]) {
			if (url.SETUP[key].hasOwnProperty(u)) {
				for (var v in url.SETUP[key][u]) {
					if (arrayJS.indexOf(url.SETUP[key][u][v]) === -1) {
						arrayJS.push(url.SETUP[key][u][v]);
					}
				}
			}
		}
	}
}

arrayJSList.push(
	path.join(
		url.source,
		url.scripts.javascript,
		url.concat.ACTIVE_CONCAT
			? url.ignore.concatactiveconcat
			: url.ignore.concat
	)
);
for (var i = 0; i < arrayJS.length; i++) {
	arrayJSList.push(url.src2 + '/' + arrayJS[i] + '/index.js');
}
arrayJSList.push(
	args.production || process.argv.slice(2).indexOf('builder') > -1
		? '!' +
				path.join(
					url.source,
					url.scripts.javascript,
					'**/canhcam-dev.js'
				)
		: path.join()
);

// Run task
gulp.task('babel-concat', () => {
	return gulp
		.src(arrayJSList)
		.pipe(
			plugins.plumber({
				errorHandler: reportError,
			})
		)
		.pipe(concat(url.concat.babelconcat + '.js'))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.babel())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destjs));
});
