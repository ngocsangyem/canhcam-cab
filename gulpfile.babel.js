'use strict';

import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSyncLib from 'browser-sync';
import autoprefixer from 'autoprefixer';
import minimist from 'minimist';
import wrench from 'wrench';
import runSequence from 'run-sequence';
import genfile from 'gulp-file'


const fs = require('fs');
const fse = require('fs-extra');
const yaml = require("js-yaml");
const load = yaml.load(fs.readFileSync("./k-task/config.yml"));
const loadGEN = JSON.parse(fs.readFileSync("./src/" + load.config.dev + "/include.json"));
const loadSEO = JSON.parse(fs.readFileSync("./src/" + load.config.dev + "/seo.json"));
const loadCC = JSON.parse(fs.readFileSync("./src/" + load.config.dev + "/concat.json"));

if (process.argv.slice(2).indexOf("k-dev") > -1) {
	const loadCC = JSON.parse(fs.readFileSync("./core/_default/concat.json"));
}

// Global
const plugins = gulpLoadPlugins();

// Create karma server
const KarmaServer = require('karma').Server;

// Create a new browserSync

const defaultNotification = function(err) {
    return {
        subtitle: err.plugin,
        message: err.message,
        sound: 'Funk',
        onLast: true,
    };
};

load.config.concat = loadCC.concat
load.config.SEO = loadSEO.SEO
load.config.SETUP = loadGEN.SETUP

// var fstm = require('fs');
// var dirtm = './src/' + load.config.dev + '/';

// if (!fstm.existsSync(dirtm)) {
//     fstm.mkdirSync(dirtm);
// }
// for (var key in loadGEN.SETUP) {
//     if (loadGEN.SETUP.hasOwnProperty(key)) {
//         fstm.writeFileSync(dirtm + key + '.pug', '');
// 		fstm.appendFileSync(dirtm + key + '.pug', 'extends templates/_layout/layout.pug\n');
//         fstm.appendFileSync(dirtm + key + '.pug', 'block variables\n');
//         fstm.appendFileSync(dirtm + key + '.pug', '\t- var title = "' + key + '"\n');
//         fstm.appendFileSync(dirtm + key + '.pug', '\t- var description = "Description for ' + key + ' page"\n');
//         fstm.appendFileSync(dirtm + key + '.pug', '\t- var bodyclass = "' + key + '"\n');
//         fstm.appendFileSync(dirtm + key + '.pug', '\t- var href = "/' + key + '.html"\n');
//         for (var u in loadGEN.SETUP[key]) {
//             if (loadGEN.SETUP[key].hasOwnProperty(u)) {
// 				fstm.appendFileSync(dirtm + key + '.pug', 'block ' + u + '\n');
//                 for (var v in loadGEN.SETUP[key][u]) {

// 					let dirfull = loadGEN.SETUP[key][u][v].slice(0, loadGEN.SETUP[key][u][v].indexOf("/"))
// 					async function copyFiles() {
// 						try {
// 							await fse.copy('./CANHCAM-LIB/' + dirfull, './src/demo/core/' + dirfull)
// 							await fse.copy('./core/templates', './src/demo/templates')
// 						} catch (err) {
// 						}
// 					}
// 					copyFiles()

//                     fstm.appendFileSync(dirtm + key + '.pug', '\tinclude core/' + loadGEN.SETUP[key][u][v] + '/index.pug\n');
//                 }
//             }
//         }
//     }
// }



// Call Config
let config = Object.assign({}, load.config, defaultNotification);

// Call ENV
let setgulp = minimist(process.argv.slice(2));

let target = setgulp.production ? config.dest : config.tmp;

let browserSync = browserSyncLib.create();
// Load Gulp tasks folder
wrench.readdirSyncRecursive('./k-task/task/gulp').filter((file) => {
    return (/\.(js)$/i).test(file);
}).map(function(file) {
    require('./k-task/task/gulp/' + file)(gulp, setgulp, plugins, config, target, browserSync);
});

// Default task
gulp.task('default', ['clean'], () => {
    gulp.start('k-task');
});

gulp.task('test', ['clean'], () => {
    gulp.start('testing');
});

gulp.task('serve', ['clean'], () => {
    gulp.start('ser');
});

gulp.task('dev', ['clean'], () => {
    gulp.start('k-dev');
});

gulp.task('builder', ['clean'], () => {
	gulp.start('k-builder');
});

gulp.task('server', ['clean'], () => {
    gulp.start('ser');
});

// Build task
gulp.task('build', ['cleanall'], () => {
    gulp.start('product');
});
gulp.task('build-local', ['cleanall'], () => {
    gulp.start('product-local');
});
gulp.task('build-no', ['cleanall'], () => {
    gulp.start('product-no');
});
gulp.task('build-local-no', ['cleanall'], () => {
    gulp.start('product-local-no');
});

// Basic production-ready code
gulp.task('k-task', function(cb) {
    runSequence(
        'sass', // css, less, stylus
        'concat',
        'babel',
        'babel-concat',
        'pug', // hamber, ejs, pug
        'copy',
        'fonts',
        cb
    );
});

gulp.task('ser', function(cb) {
    runSequence(
        'k-task',
        'inject',
        'browserSync',
        'watch',
        cb
    );
});


// Rebuild will call by browserify
gulp.task('product', function(cb) {
    runSequence(
        'k-task',
        // 'favicon',
        'cssmin',
        'uglify',
        'csscomb',
        'tobase64',
        'rev',
        'delete-css',
        'delete-js',
        'revreplace',
        'sitemap',
        'htmlmin',
        'imagemin',
        'header',
        'cleanup',
        'cleanup-js',
        'cleanup-css',
        'browserSync',
        'done',
        cb
    );
});

// Rebuild will call by browserify
gulp.task('product-no', function(cb) {
    runSequence(
        'k-task',
        // 'favicon',
        'csscomb',
        'tobase64',
        'inject',
        'sitemap',
        'htmlmin',
        'imagemin',
        'remove-comment-css',
        'remove-comment-js',
        'html-beautify',
        'header',
        'cleanup',
        'browserSync',
        'done',
        cb
    );
});

// Not min & can run without localhost
gulp.task('product-local', function(cb) {
    runSequence(
        'k-task',
        // 'favicon',
        'cssmin',
        'uglify',
        'csscomb',
        'tobase64',
        'rev',
        'delete-css',
        'delete-js',
        'revreplace',
        'sitemap',
        'htmlmin',
        'imagemin',
        'header',
        'cleanup',
        'cleanup-js',
        'cleanup-css',
        'local-run',
        'local-run-home',
        'browserSync',
        'done',
        cb
    );
});

// Not min & can run without localhost
gulp.task('product-local-no', function(cb) {
    runSequence(
        'k-task',
        // 'favicon',
        'csscomb',
        'tobase64',
        'inject',
        'sitemap',
        'htmlmin',
        'imagemin',
        'remove-comment-css',
        'remove-comment-js',
        'html-beautify',
        'header',
        'cleanup',
        'local-run',
        'local-run-home',
        'browserSync',
        'done',
        cb
    );
});


// Basic production-ready code
gulp.task('k-dev', function (cb) {
	runSequence(
		'pug-copy-dev', // hamber, ejs, pug
		'sass', // css, less, stylus
		'sass-dev', // css, less, stylus
		'concat',
		'babel',
		'babel-concat-dev',
		'copy',
		'fonts',
		'pug-dev', // hamber, ejs, pug
		'inject',
		'pug-rename-dev',
		'map-dev',
		'browserSync',
		cb
	);
});
gulp.task('k-builder', function (cb) {
	runSequence(
		'pug-copy-dev', // hamber, ejs, pug
		'sass', // css, less, stylus
		'sass-dev', // css, less, stylus
		'concat',
		'babel',
		'babel-concat-dev',
		'copy',
		'fonts',
		'pug-dev', // hamber, ejs, pug
		'inject-dev',
		'pug-rename-dev',
		'map-dev',
		cb
	);
});



// Testing
gulp.task('testing', (done) => {
    new KarmaServer({
        configFile: path.join(__dirname, '/k-task/karma.conf.js'),
        singleRun: !setgulp.watch,
        autoWatch: setgulp.watch
    }, done).start();
});
