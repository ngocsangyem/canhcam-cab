import gulp from 'gulp'

const browserSyncLib = require("browser-sync");
const minimist = require("minimist");


const gutil = require("gulp-util");
const gulpLoadPlugins = require("gulp-load-plugins");
const notify = require("gulp-notify");

import { readFileSync } from 'fs';
import { load as _load } from 'js-yaml';

const load = _load(readFileSync('./k-task/config.yml'));
const loadSEO = JSON.parse(readFileSync('./core/seo.json'));
const loadCC = JSON.parse(readFileSync('./core/concat.json'));
const getApp = JSON.parse(readFileSync('./@SITE/setup.json'));
let loadGEN = JSON.parse(
	readFileSync(load.config.src + '/' + load.config.dev + '/include.json')
);

let srcgettmp = '';
let devgettmp = '';

if (process.argv.slice(2).indexOf('builder') > -1) {
	srcgettmp = load.config.src;
	devgettmp = load.config.dev;
} else if (process.argv.slice(2).indexOf('dev') > -1) {
	srcgettmp = load.config.src;
	devgettmp = load.config.dev;
} else if (
	process.argv.slice(2).indexOf('serve') > -1 ||
	process.argv.slice(2).indexOf('server') > -1
) {
	loadGEN = JSON.parse(
		readFileSync('./@SITE/' + getApp.sitename + '/include.json')
	);
	srcgettmp = '@SITE';
	devgettmp = getApp.sitename;
}

loadGEN.src = srcgettmp;
loadGEN.dev = devgettmp;

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
const plugins = gulpLoadPlugins();

// Create karma server
import { Server as KarmaServer } from 'karma';

load.config.concat = loadCC.concat;
load.config.SEO = loadSEO.SEO;
load.config.SETUP = loadGEN.SETUP;
load.config.src = loadGEN.src;
load.config.dev = loadGEN.dev;

// Call Config
let config = Object.assign({}, load.config);

// Gather arguments passed to gulp commands
const args = minimist(process.argv.slice(2));

// Determine gulp task target destinations
const taskTarget = args.production ? config.dest : config.tmp;

// Create a new browserSync instance
const browserSync = browserSyncLib.create();

const reportError = function(error) {
	// [log]
	//console.log(error);

	// Format and ouput the whole error object
	//console.log(error.toString());

	// ----------------------------------------------
	// Pretty error reporting

	var report = "\n";
	var chalk = gutil.colors.white.bgRed;

	if (error.plugin) {
		report += chalk("PLUGIN:") + " [" + error.plugin + "]\n";
	}

	if (error.message) {
		report += chalk("ERROR: ") + " " + error.message + "\n";
	}

	console.error(report);

	// ----------------------------------------------
	// Notification

	if (error.line && error.column) {
		var notifyMessage = "LINE " + error.line + ":" + error.column + " -- ";
	} else {
		var notifyMessage = "";
	}

	notify({
		title: "FAIL: " + error.plugin,
		message: `${notifyMessage}${error.message}`,
		sound: "Frog" // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
	}).write(error);

	gutil.beep(); // System beep (backup)

	// ----------------------------------------------
	// Prevent the 'watch' task from stopping

	this.emit("end");
};

module.exports = {
	gulp,
	args,
	plugins,
	config,
	taskTarget,
	browserSync,
	reportError,
	KarmaServer
};
