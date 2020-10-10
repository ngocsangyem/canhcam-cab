'use strict';

import path from 'path';
import del from 'del';
import fs from 'fs';
import realFavicon from 'gulp-real-favicon';

const {
	gulp,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);

// Run task
let FAVICON_DATA_FILE = path.join(taskTarget, 'favicon.json');

gulp.task('favicon', (done) => {
	return realFavicon.generateFavicon(
		{
			masterPicture: url.favicon,
			dest: path.join(taskTarget, 'favicon'),
			iconsPath: '/favicon',
			design: {
				ios: {
					pictureAspect: 'noChange',
					assets: {
						ios6AndPriorIcons: false,
						ios7AndLaterIcons: false,
						precomposedIcons: false,
						declareOnlyDefaultIcon: true,
					},
				},
				desktopBrowser: {},
				windows: {
					pictureAspect: 'noChange',
					backgroundColor: '#da532c',
					onConflict: 'override',
					assets: {
						windows80Ie10Tile: false,
						windows10Ie11EdgeTiles: {
							small: false,
							medium: true,
							big: false,
							rectangle: false,
						},
					},
				},
				androidChrome: {
					pictureAspect: 'noChange',
					themeColor: '#ffffff',
					manifest: {
						name: url.SEO.cfg_name,
						display: 'standalone',
						orientation: 'notSet',
						onConflict: 'override',
						declared: true,
					},
					assets: {
						legacyIcon: false,
						lowResolutionIcons: false,
					},
				},
				safariPinnedTab: {
					pictureAspect: 'silhouette',
					themeColor: '#5bbad5',
				},
			},
			settings: {
				scalingAlgorithm: 'Mitchell',
				errorOnImageTooSmall: false,
			},
			markupFile: FAVICON_DATA_FILE,
		},
		function () {
			done();
		}
	);
});

gulp.task('inject-favicon-markups', () => {
	gulp.src([path.join(taskTarget, '**/*.html')])
		.pipe(
			realFavicon.injectFaviconMarkups(
				JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
			)
		)
		.pipe(gulp.dest(dest));
});

gulp.task('check-for-favicon-update', (done) => {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function (err) {
		if (err) {
			throw err;
		}
	});
});
