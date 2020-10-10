'use strict';

import path from 'path';
import del from 'del';

const {
	gulp,
	config,
	taskTarget,
} = require('../utils');

let url = config;
let dest = path.join(taskTarget);

// Run task
gulp.task(
	'clean',
	del.bind(null, [
		path.join(url.tmp),
		path.join('tmppug'),
		path.join('tmptool'),
	])
);

gulp.task(
	'cleanall',
	del.bind(null, [path.join(url.tmp), path.join(url.dest)])
);
